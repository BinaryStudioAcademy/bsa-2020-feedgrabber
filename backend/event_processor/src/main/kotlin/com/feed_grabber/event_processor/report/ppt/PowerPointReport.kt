package com.feed_grabber.event_processor.report.ppt

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
//        @Autowired private val apiHelper: ReportApiHelper,
//        @Autowired private val parser: ReportService,
        @Autowired private val chartSlideCreator: ChartSlide)
{
    fun create(requestId: UUID?, report: Report) {
        //val data: DataForReport = apiHelper.fetchReportData(requestId)
        //val report = parser.parseIncomingData(data)

        val ppt = XMLSlideShow()
        val requestTitle = report.questionnaire.title
        createTitleSlide(ppt, requestTitle)
//        val defMasters  = ppt.slideMasters[0]
//
//        val layout = defMasters.getLayout(SlideLayout.TITLE_ONLY);
//        val layoutSlide = ppt.createSlide(layout)
//        val title = layoutSlide.getPlaceholder(0)
//        title.clearText();
//        title.topInset = 150.0
//        title.anchor = Rectangle(40, 150, 600, 100)
//
//        val p = title.addNewTextParagraph()
//        val r = p.addNewTextRun()
//        r.setText(requestTitle);
//        r.fontSize = 40.0


        for(question in report.questions!!) {

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

        val file = File("example1.pptx");
        val out = FileOutputStream(file);

        ppt.write(out);
        out.close()

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


//fun main(args: Array<String>) {
//    val a: List<String> = mutableListOf("one", "two", "three", "four")
//    val b = mutableListOf("six", "5", "three", "four", "four")
//    val c = mutableListOf(a, b)
//    val d = c.flatten()
//
//        val variants = mutableMapOf<String, Int>();
//        val allAnswers = d
//
//    d.forEach {variants.merge(it, 1, Int::plus)}
//
//    variants.forEach {println(it.key + " " + it.value)}
//
//
//}


fun main(args: Array<String>) {
    val linklist = mutableListOf(
            "https://www.youtube.com/watch?v=lR0Pg8KBtpc",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpd",
            "https://www.youtube.com/watch?v=lR0Pg8KBtph",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpct",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcq",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcw",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpce",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcrr",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpctt",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcyy",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcuu",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcii",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpciii",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcooo",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcpp"
    )
    val linklist2 = mutableListOf(
            "https://www.youtube.com/watch?v=lR0Pg8KBtpckk",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcll",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcl",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcmm",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcm",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcn",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcbb",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcb",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcnnn",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcccc",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcxx",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpclast")

    val uplquestions = QAWithValues(mutableMapOf(UUID.randomUUID() to linklist, UUID.randomUUID() to linklist2))

    val uploadQDB = QuestionDB(
            UUID.randomUUID(),
            "Please upload short video about your college",
            "video",
            QuestionTypes.fileUpload,
            uplquestions
    )

    val freeTextAnswers = QAWithValue(mutableMapOf(
            UUID.randomUUID() to "Yes of course",
            UUID.randomUUID() to "It isn`t necessary",
            UUID.randomUUID() to "Such a stupid question",
            UUID.randomUUID() to "I don`t now",
            UUID.randomUUID() to "I am thinking, therefore I am existing"
    ))
    val freeTextQDB = QuestionDB(
            UUID.randomUUID(),
            "Be or Not to be?",
            "video",
            QuestionTypes.freeText,
            freeTextAnswers
    )

    val firstUserOptions = listOf("hardworking",  "funny", "idiot", "smart")
    val UserOptions2 = listOf("hardworking", "funny",  "smart")
    val UserOptions3 = listOf("hardworking")
    val UserOptions4 = listOf( "lazy")
    val optQdb = QAWithOptions(
            mutableMapOf(
                    UUID.randomUUID() to firstUserOptions,
                    UUID.randomUUID() to UserOptions2,
                    UUID.randomUUID() to UserOptions3,
                    UUID.randomUUID() to UserOptions4
            ),
            mutableMapOf("other" to mutableListOf<UUID>(UUID.randomUUID(), UUID.randomUUID()))
    )


    val checkboxQDB = QuestionDB(
            UUID.randomUUID(),
            "Choose your college characteristics",
            "video",
            QuestionTypes.checkbox,
            optQdb
    )

    val dateQdb = QAWithOptionNoOther(
            mutableMapOf(
                    UUID.randomUUID() to "2020-09-12",
                    UUID.randomUUID() to "2020-09-12",
                    UUID.randomUUID() to "2020-09-12",
                    UUID.randomUUID() to "2020-09-13",
                    UUID.randomUUID() to "2020-09-13",
                    UUID.randomUUID() to "2020-09-18",
                    UUID.randomUUID() to "2020-09-18",
                    UUID.randomUUID() to "2020-09-19",
                    UUID.randomUUID() to "2020-09-01",
                    UUID.randomUUID() to "2020-09-20",
                    UUID.randomUUID() to "2020-09-22",
                    UUID.randomUUID() to "2020-09-23"
            )
    )
    val dateQDB = QuestionDB(
            UUID.randomUUID(),
            "Chose date when you wont to take a vocation",
            "vocation",
            QuestionTypes.date,
            dateQdb
    )


    val questions = mutableListOf<QuestionDB>(uploadQDB, freeTextQDB, checkboxQDB, dateQDB)
    //val uploadFile = QAWithValues(mutableMapOf(UUID.randomUUID() to linklist))
    val questionnaire = QuestionnaireDto("company name",
            UUID.randomUUID(), listOf(), "Common employees questionnaire #21")
    val user = UserDto("email@mail.com", UUID.randomUUID(), "employee", "MegaPihar")
    val data =  Report(UUID.randomUUID(), questions, questionnaire, Date(), Date(), user, user, "", "")

    var cr = PowerPointReport(ChartSlide())
    cr.create(null, data)
//    //creating a new empty slide show
//    val ppt = XMLSlideShow();
//
//    //creating an FileOutputStream object
//

//
//    createFileSlide(ppt, "question", list)



}

