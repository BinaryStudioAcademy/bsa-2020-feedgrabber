package com.feed_grabber.event_processor.report.ppt

import com.feed_grabber.event_processor.report.ReportApiHelper
import com.feed_grabber.event_processor.report.ReportService
import com.feed_grabber.event_processor.report.dto.DataForReport
import com.feed_grabber.event_processor.report.dto.UserDto
import com.feed_grabber.event_processor.report.model.QAWithOption
import com.feed_grabber.event_processor.report.model.QAWithOptions
import com.feed_grabber.event_processor.report.model.QAWithValue
import com.feed_grabber.event_processor.report.model.QAWithValues
import org.apache.poi.sl.usermodel.Insets2D
import org.apache.poi.sl.usermodel.SlideShow
import org.apache.poi.xslf.usermodel.SlideLayout
import org.apache.poi.xslf.usermodel.XMLSlideShow
import org.apache.poi.xslf.usermodel.XSLFTextParagraph
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.awt.Rectangle
import java.io.File
import java.io.FileOutputStream
import java.util.*

@Service
class PowerPointReport(
        @Autowired private val apiHelper: ReportApiHelper,
        @Autowired private val parser: ReportService,
        @Autowired private val chartSlideCreator: ChartSlide)
{
    fun create(requestId: UUID) {
        val data: DataForReport = apiHelper.fetchReportData(requestId)
        val report = parser.parseIncomingData(data)

        val ppt = XMLSlideShow()
        val requestTitle = report.questionnaire.title
        val defMasters  = ppt.slideMasters[0]

        val layout = defMasters.getLayout(SlideLayout.TITLE_ONLY);
        val layoutSlide = ppt.createSlide(layout)
        val title = layoutSlide.getPlaceholder(0)
        title.clearText();

        val p = title.addNewTextParagraph()
        val r = p.addNewTextRun()
        r.setText(requestTitle);
        // r.setFontColor(Color.decode("#c62828"))
        r.fontSize = 40.0
        title.anchor = Rectangle(40, 10, 600, 100)

        for(question in report.questions) {
            if (question.answers == null) {
                continue;
            }

            when(val answers = question.answers) {
                is QAWithOptions -> {
                    val allAnswers = answers.options.values.flatten()
                    val variants = getVariantCounts(allAnswers, answers.other);
                    chartSlideCreator.createPieChartSlide(ppt, variants, question.title)
                }
                is QAWithOption -> {
                    val allAnswers = answers.options.values
                    val variants = getVariantCounts(allAnswers.toList(), answers.other)
                    chartSlideCreator.createPieChartSlide(ppt, variants, question.title)
                }
                is QAWithValues -> {
                    answers.values
                }
            }

        }

    }

    private fun createFileSlide(
            slideShow: XMLSlideShow,
            questionText: String,
            links: MutableList<String>
    ) {
        val defMasters  = slideShow.slideMasters[0]
        val layout = defMasters.getLayout(SlideLayout.TITLE_AND_CONTENT);
        val slide = slideShow.createSlide(layout)
        val title = slide.getPlaceholder(0)
        title.clearText();
        val textRun = title.addNewTextParagraph().addNewTextRun();
        textRun.setText(questionText);

        val content = slide.getPlaceholder(1)
        val maxHeight = content.anchor.height;

        val added = mutableListOf<String>()
        links.map { url ->
            val text = content.addNewTextParagraph().addNewTextRun()
            val link = text.createHyperlink()
            link.setAddress(url);
            added.add(url)
            if (content.textHeight > maxHeight) {
                val remainders = links.filter { !added.contains(it) }
                createFileSlide(slideShow, questionText, remainders.toMutableList())
            }
        }
    }

    private fun getUserLinksPart (user: UserDto, links: List<String>) {

    }

    fun getVariantCounts(
            allAnswers: List<String>,
            other: MutableMap<String?, MutableList<UserDto>>
    ): MutableMap<String, Int> {
        val variants = mutableMapOf<String, Int>();
        allAnswers.forEach {variants.merge(it, 1, Int::plus)}
        val count = other.values.flatten().count()
        variants.put("Other", count)
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

    //creating a new empty slide show
    val ppt = XMLSlideShow();

    //creating an FileOutputStream object

    val list = mutableListOf<String>(
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
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcpp",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcaa",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcss",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcdd",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcff",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcgg",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpchh",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpcjj",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpck",
            "https://www.youtube.com/watch?v=lR0Pg8KBtpckkk",
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
            "https://www.youtube.com/watch?v=lR0Pg8KBtpczzz"
    )

    createFileSlide(ppt, "question", list)
    val file = File("example1.pptx");
    val out = FileOutputStream(file);

    ppt.write(out);
    System.out.println("Presentation created successfully");
    out.close()
}

fun createFileSlide(
        slideShow: XMLSlideShow,
        questionText: String,
        links: MutableList<String>
) {
    val defMasters  = slideShow.slideMasters[0]
    val layout = defMasters.getLayout(SlideLayout.TITLE_AND_CONTENT);
    val slide = slideShow.createSlide(layout)
    val title = slide.getPlaceholder(0)
    title.clearText();
    val textRun = title.addNewTextParagraph().addNewTextRun();
    textRun.setText(questionText);

    val content = slide.getPlaceholder(1)
    val maxHeight = content.anchor.height;

    val added = mutableListOf<String>()
    for (url in links) {
        val text = content.addNewTextParagraph().addNewTextRun()
        text.setText(url)
        val link = text.createHyperlink()
        link.setAddress(url);
        added.add(url)
        if (content.textHeight > maxHeight) {
            val remainders = links.filter { !added.contains(it) }
            if (remainders.isNotEmpty()) {
                createFileSlide(slideShow, questionText, remainders.toMutableList())
            } else {
                return
            }
        }
    }
    println(content.textHeight)
}
