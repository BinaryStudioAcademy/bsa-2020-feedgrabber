package com.feed_grabber.event_processor.report.ppt

import com.feed_grabber.event_processor.fileStorage.AmazonS3ClientService
import com.feed_grabber.event_processor.rabbit.Sender
import com.feed_grabber.event_processor.report.ReportApiHelper
import com.feed_grabber.event_processor.report.ReportService
import com.feed_grabber.event_processor.report.dto.DataForReport
import com.feed_grabber.event_processor.report.dto.QuestionTypes
import com.feed_grabber.event_processor.report.dto.QuestionnaireDto
import com.feed_grabber.event_processor.report.dto.UserDto
import com.feed_grabber.event_processor.report.model.*
import org.apache.poi.sl.usermodel.Placeholder
import org.apache.poi.xslf.usermodel.SlideLayout
import org.apache.poi.xslf.usermodel.XMLSlideShow
import org.apache.poi.xslf.usermodel.XSLFSlide
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.awt.Color
import java.awt.Rectangle
import java.io.File
import java.io.FileOutputStream
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*


@Service
class PowerPointReport(
        @Autowired private val apiHelper: ReportApiHelper,
        @Autowired private val parser: ReportService,
        @Autowired private val client: AmazonS3ClientService,
        @Autowired private val chartSlideCreator: ChartSlide,
        @Autowired private val sender: Sender
) {
    fun create(requestId: UUID) {
        val data: DataForReport = apiHelper.fetchReportData(requestId)
        val report = parser.parseIncomingData(data)
        if (report.questions == null) {
            return
        }

        val ppt = XMLSlideShow()
        val requestTitle = report.questionnaire.title
        createTitleSlide(ppt, requestTitle)


        for(question in report.questions) {
            when(val answers = question.answers) {
                is QAWithOptions -> {
                    val allAnswers = answers.options.values.flatten()
                    val variants: MutableMap<String, Int> = getVariantCounts(allAnswers, answers.other)
                    chartSlideCreator.createPieChartSlide(ppt, variants, question.title)
                }
                is QAWithOption -> {
                    val allAnswers = answers.options.values
                    val variants = getVariantCounts(allAnswers.toList(), answers.other)
                    chartSlideCreator.createPieChartSlide(ppt, variants, question.title)
                }
                is QAWithValues -> {
                    if(question.type == QuestionTypes.fileUpload) {
                        val allLinks = answers.values.values.flatten().toMutableList()
                        createFileSlide(ppt, allLinks, question.title)
                    }
                }
                is QAWithOptionNoOther -> {
                    if(question.type == QuestionTypes.date ) {
                        val dates = answers.options.values.toList()
                        val variants = getVariantCounts(dates, null)
                        chartSlideCreator.createBarChartSlide(ppt, variants, question.title)

                    } else if (question.type == QuestionTypes.scale) {
                        val dates = answers.options.values.toList()
                        val variants = getVariantCounts(dates, null)
                        chartSlideCreator.createBarChartSlide(ppt, variants, question.title)
                    }
                }
                is QAWithValue -> {
                    if(question.type == QuestionTypes.freeText) {
                        val texts = answers.values
                        createFreeTextSlide(ppt, texts, question.title)
                    }
                }
            }

        }

        val file = File("${UUID.randomUUID()}-ppt-report.pptx")
        val fileOut = FileOutputStream(file)
        ppt.write(fileOut)
        fileOut.close()
        ppt.close()
        val response = client.uploadReport(file, requestId)
        sender.sendPPTReportURL(response)
        file.delete()
    }

    private fun createTitleSlide(slideShow: XMLSlideShow, text: String) {
        val slide = slideShow.createSlide()
        val title = slide.createTextBox()
        title.anchor = Rectangle(40, 140, 620, 100)
        title.placeholder = Placeholder.TITLE;
        val p = title.addNewTextParagraph()
        val r = p.addNewTextRun()
        r.setText(text);
        // r.setFontColor(Color.decode("#c62828"))
        r.fontSize = 40.0

    }


    fun createFileSlide(
            slideShow: XMLSlideShow,
            links: MutableList<String>,
            questionText: String
    ) {
        val defMasters  = slideShow.slideMasters[0]
        val layout = defMasters.getLayout(SlideLayout.TITLE_AND_CONTENT)
        val slide = slideShow.createSlide(layout)
        setTitle(slide, questionText)

        val content = slide.getPlaceholder(1)
        content.clearText();
        val maxHeight = content.anchor.height - 60;

        val added = mutableListOf<String>()
        for (url in links) {
            val text = content.addNewTextParagraph().addNewTextRun()
            text.setText(url)
            text.fontSize = 14.0
            text.createHyperlink().address = url;
            added.add(url)
            if (content.textHeight > maxHeight) {
                val remainders = links.filter { !added.contains(it) }
                if (remainders.isNotEmpty()) {
                    createFileSlide(slideShow, remainders.toMutableList(), questionText)
                    break
                }
            }
        }
    }

    fun createFreeTextSlide(
            slideShow: XMLSlideShow,
            answers: MutableMap<UUID, String>,
            questionText: String

    ) {
        val defMasters  = slideShow.slideMasters[0]
        val layout = defMasters.getLayout(SlideLayout.TITLE_AND_CONTENT)
        val slide = slideShow.createSlide(layout)
        setTitle(slide, questionText)

        val content = slide.getPlaceholder(1)
        content.clearText();
        val maxHeight = content.anchor.height - 20

        val added = mutableListOf<UUID>()
        for (answer in answers) {
            val text = content.addNewTextParagraph().addNewTextRun()
            text.setText(answer.value)
            text.fontSize = 14.0
            added.add(answer.key)
            if (content.textHeight > maxHeight) {
                val remainders = answers.filter { !added.contains(it.key) }
                if (remainders.isNotEmpty()) {
                    createFreeTextSlide(slideShow, remainders.toMutableMap(), questionText)
                    break
                }
            }
        }
    }

    private fun setTitle(slide: XSLFSlide, questionText: String) {
        val title = slide.getPlaceholder(0)
        title.clearText()
        title.anchor = Rectangle(40, 10, 620, 100)
        val textRun = title.addNewTextParagraph().addNewTextRun()
        textRun.setText(questionText)
        textRun.setFontColor(Color.decode("#c62828"))
        textRun.fontSize = 25.0
    }

    fun getVariantCounts(
            allAnswers: List<String>,
            other: MutableMap<String, MutableList<UUID>>?
    ): MutableMap<String, Int> {
        val variants = mutableMapOf<String, Int>()
        allAnswers.forEach {variants.merge(it, 1, Int::plus)}
        if (other != null) {
            val count = other.values.flatten().count()
            variants["Other"] = count
        }
        return variants
    }



}

