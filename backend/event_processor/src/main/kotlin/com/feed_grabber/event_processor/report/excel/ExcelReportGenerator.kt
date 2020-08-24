package com.feed_grabber.event_processor.report.excel

import com.feed_grabber.event_processor.report.ReportService
import com.feed_grabber.event_processor.report.dto.*
import com.feed_grabber.event_processor.report.model.QuestionDB
import org.apache.poi.ss.usermodel.*
import org.apache.poi.ss.util.CellRangeAddress
import org.apache.poi.xssf.usermodel.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.io.FileOutputStream
import java.io.IOException
import java.time.LocalDate
import java.util.stream.Collectors


@Service
class ExcelReportGenerator(@Autowired private val service: ReportService) {

    private val VERTICAL_INDENT = 1
    private val HORIZONTAL_INDENT = 1
    private val LETTER_WIDTH = 426
    private lateinit var titleFont: XSSFFont
    private lateinit var headerFont: XSSFFont
    private lateinit var dataFont: XSSFFont
    private lateinit var titleCellStyle: XSSFCellStyle
    private lateinit var headerCellStyle: XSSFCellStyle
    private lateinit var dataCellStyle: XSSFCellStyle

    fun answerCell(response: QuestionResponseDto, row: Row, cellPosition: Int, cellStyle: XSSFCellStyle) {
        when (response.type) {
            QuestionTypes.checkbox -> {
                val answer: CheckBoxValue = service.parseQuestion(response) as CheckBoxValue
                var stringAnswer = ""
                if (answer.selected != null)
                    stringAnswer = answer.selected.joinToString { it -> it }
                if (answer.other == null) {
                    if (stringAnswer != "")
                        stringAnswer += ", "
                    stringAnswer += answer.other
                }
                textCell(stringAnswer, row, cellPosition, cellStyle)
            }
            QuestionTypes.radio -> {
                val answer: RadioValue = service.parseQuestion(response) as RadioValue
                if (answer.selected != null)
                    textCell(answer.selected, row, cellPosition, cellStyle)
                else {
                    textCell(answer.other!!, row, cellPosition, cellStyle)
                }
            }
            QuestionTypes.fileUpload -> {
                val answer: FileValue = service.parseQuestion(response) as FileValue
                textCell(answer.urls.joinToString { it -> it }, row, cellPosition, cellStyle)
            }
            QuestionTypes.freeText -> {
                val answer: FreeTextValue = service.parseQuestion(response) as FreeTextValue
                textCell(answer.text, row, cellPosition, cellStyle)
            }
            QuestionTypes.scale -> {
                val answer: ScaleValue = service.parseQuestion(response) as ScaleValue
                numericCell(answer.number.toDouble(), row, cellPosition, cellStyle)
            }
            QuestionTypes.date -> {
                val answer: DateValue = service.parseQuestion(response) as DateValue
                var date = answer.date
                textCell(answer.date.toString(), row, cellPosition, cellStyle)
            }
        }
    }

    fun formQuestionStatistics(question: QuestionDB, rows: List<Row>, cellPosition: Int, cellStyle: XSSFCellStyle) {
        when (question.type) {
            QuestionTypes.checkbox, QuestionTypes.radio -> {
                val answers: QuestionWithOptions;
                if (question.type == QuestionTypes.checkbox)
                    answers = service.mapAnswers(QuestionTypes.checkbox, question.answers) as QuestionWithOptions
                else
                    answers = service.mapAnswers(QuestionTypes.radio, question.answers) as QuestionWithOptions
                val maxAmount = answers.options.map { it.amount }.max()
                val minAmount = answers.options.map { it.amount }.min()
                val mostCommon = answers.options.filter { a -> a.amount == maxAmount }.map { "${it.title} - ${it.amount} time(s)" }.joinToString(",\n") { it }
                val leastCommon = answers.options.filter { a -> a.amount == minAmount }.map { "${it.title} - ${it.amount} time(s)" }.joinToString(",\n") { it }
                textCell(mostCommon, rows[0], cellPosition, cellStyle)
                textCell(leastCommon, rows[1], cellPosition, cellStyle)
                textCell("-", rows[2], cellPosition, cellStyle)
                textCell("-", rows[3], cellPosition, cellStyle)
                textCell("-", rows[4], cellPosition, cellStyle)
            }
            QuestionTypes.scale -> {
                val answers = service.mapAnswers(QuestionTypes.scale, question.answers) as QuestionWithValues
                val countedAnswers = countAnswersInQuestionWithValues(answers);
                val maxAmount = countedAnswers.map { it.value }.max()
                val minAmount = countedAnswers.map { it.value }.min()
                val mostCommon = countedAnswers.filter { a -> a.value == maxAmount }.map { "${it.key} - ${it.value} time(s)" }.joinToString(",\n") { it }
                val leastCommon = countedAnswers.filter { a -> a.value == minAmount }.map { "${it.key} - ${it.value} time(s)" }.joinToString(",\n") { it }
                textCell(mostCommon, rows[0], cellPosition, cellStyle)
                textCell(leastCommon, rows[1], cellPosition, cellStyle)
                numericCell(answers.values.stream().map { it.toInt() }.collect(Collectors.toList()).max()!!.toDouble(), rows[2], cellPosition, cellStyle)
                numericCell(answers.values.stream().map { it.toInt() }.collect(Collectors.toList()).min()!!.toDouble(), rows[3], cellPosition, cellStyle)
                numericCell((answers.values.stream().map { it.toInt() }.collect(Collectors.toList()).sum().toDouble() / answers.values.size), rows[4], cellPosition, cellStyle)
            }
            QuestionTypes.date -> {
                val answers = service.mapAnswers(QuestionTypes.date, question.answers) as QuestionWithValues
                val countedAnswers = countAnswersInQuestionWithValues(answers);
                val maxAmount = countedAnswers.map { it.value }.max()
                val minAmount = countedAnswers.map { it.value }.min()
                val mostCommon = countedAnswers.filter { a -> a.value == maxAmount }.map { "${it.key} - ${it.value} time(s)" }.joinToString(",\n") { it }
                val leastCommon = countedAnswers.filter { a -> a.value == minAmount }.map { "${it.key} - ${it.value} time(s)" }.joinToString(",\n") { it }
                textCell(mostCommon, rows[0], cellPosition, cellStyle)
                textCell(leastCommon, rows[1], cellPosition, cellStyle)
                textCell(answers.values.map { v -> LocalDate.parse(v) }.max().toString(), rows[2], cellPosition, cellStyle)
                textCell(answers.values.map { v -> LocalDate.parse(v) }.min().toString(), rows[3], cellPosition, cellStyle)
                textCell("-", rows[4], cellPosition, cellStyle)
            }
            QuestionTypes.fileUpload, QuestionTypes.freeText -> {
                textCell("-", rows[0], cellPosition, cellStyle)
                textCell("-", rows[1], cellPosition, cellStyle)
                textCell("-", rows[2], cellPosition, cellStyle)
                textCell("-", rows[3], cellPosition, cellStyle)
                textCell("-", rows[4], cellPosition, cellStyle)
            }
        }
    }

    @Throws(IOException::class)
    fun generate(report: DataForReport, parsedQuestions: List<QuestionDB>?): Unit {
        if (parsedQuestions != null) {

            // #WORKBOOK
            var workbook = XSSFWorkbook()

            // #FONTS
            titleFont = workbook.createFont()
            titleFont.bold = true
            titleFont.setFontHeightInPoints(24.toShort())
            titleFont.setFontName("Arial")

            headerFont = workbook.createFont()
            headerFont.bold = true
            headerFont.setFontHeightInPoints(16.toShort())
            headerFont.setFontName("Arial")

            dataFont = workbook.createFont()
            dataFont.setFontHeightInPoints(14.toShort())
            dataFont.setFontName("Arial")

            // #STYLES
            titleCellStyle = workbook.createCellStyle()
            titleCellStyle.setFont(titleFont)
            titleCellStyle.alignment = HorizontalAlignment.CENTER;
            titleCellStyle.verticalAlignment = VerticalAlignment.CENTER;

            headerCellStyle = workbook.createCellStyle()
            headerCellStyle.setFont(headerFont)
            headerCellStyle.wrapText = true
            headerCellStyle.verticalAlignment = VerticalAlignment.CENTER;

            dataCellStyle = workbook.createCellStyle()
            dataCellStyle.setFont(dataFont)
            dataCellStyle.wrapText = true
            dataCellStyle.verticalAlignment = VerticalAlignment.TOP;

            generateMainPage(workbook, parsedQuestions, report)

            generateQuestionsPage(workbook, parsedQuestions, report)

            // #WRITE_FILE
            val fileOut = FileOutputStream("report.xlsx")
            workbook.write(fileOut)
            fileOut.close()
            workbook.close()
        }
    }

    fun generateMainPage(workbook: XSSFWorkbook, parsedQuestions: List<QuestionDB>, report: DataForReport) {
        val headers = mutableListOf("#", "respondent")
        headers.addAll(parsedQuestions.map { q -> q.title })
        val questionsNumber = parsedQuestions.size
        val columnsNumber = headers.size
        val rowsNumber = report.responses.size
        var statisticsStartRow = rowsNumber + VERTICAL_INDENT + 4;

        // #SHEET
        val sheet = workbook.createSheet("Collected data")

        sheet.isPrintGridlines = false;
        sheet.isDisplayGridlines = false;

        val sheetCF = sheet.sheetConditionalFormatting
        val responsesRule: XSSFConditionalFormattingRule = sheetCF.createConditionalFormattingRule("MOD(ROW(),2)=0")
        val responsesFormatingPattern = responsesRule.createPatternFormatting()
        responsesFormatingPattern.fillBackgroundColor = IndexedColors.LIGHT_GREEN.index
        responsesFormatingPattern.fillPattern = PatternFormatting.SOLID_FOREGROUND

        val statsRule: XSSFConditionalFormattingRule = sheetCF.createConditionalFormattingRule("MOD(ROW(),2)=0")
        val statsFormatingPattern = statsRule.createPatternFormatting()

        statsFormatingPattern.fillBackgroundColor = IndexedColors.GREY_25_PERCENT.index
        statsFormatingPattern.fillPattern = PatternFormatting.SOLID_FOREGROUND

        val cfRules = arrayOf<ConditionalFormattingRule>(statsRule, responsesRule)
        val regions = arrayOf(CellRangeAddress(2, rowsNumber + 2, 1, columnsNumber), CellRangeAddress(statisticsStartRow + 2, statisticsStartRow + 6, 3, columnsNumber))
        sheetCF.addConditionalFormatting(regions, cfRules)

        sheet.createFreezePane(0, 3)

        // #TITLE
        val titleRow: Row = sheet.createRow(1)
        titleRow.heightInPoints = 55.toFloat()
        textCell(report.questionnaire.title + " questionnaire report", titleRow, 1, titleCellStyle)
        sheet.addMergedRegion(CellRangeAddress(VERTICAL_INDENT, VERTICAL_INDENT, HORIZONTAL_INDENT, columnsNumber))

        // #HEADERs
        val headerRow: Row = sheet.createRow(2)
        for (col in headers.indices)
            textCell(headers[col], headerRow, col + 1, headerCellStyle)


        // #RESPONSEs
        for (row in report.responses.indices) {
            val responseRow: Row = sheet.createRow(row + 3)

            numericCell(row.toDouble() + 1, responseRow, 1, dataCellStyle)

            textCell(report.responses[row].user.username, responseRow, 2, dataCellStyle)
            if (report.responses[row].payloadList != null)
                for (col in report.responses[row].payloadList!!.indices)
                    answerCell(report.responses[row].payloadList!!.get(col), responseRow, col + 3, dataCellStyle)
            else
                for (col in 0..questionsNumber)
                    errorCell(responseRow, col + 3, dataCellStyle)
        }

        // #STATS


        val statisticHeaderRow: Row = sheet.createRow(statisticsStartRow)
        sheet.addMergedRegion(CellRangeAddress(statisticsStartRow, statisticsStartRow, HORIZONTAL_INDENT, 2))
        val frequentStatisticsRow: Row = sheet.createRow(statisticsStartRow + 2)
        val rearStatisticsRow: Row = sheet.createRow(statisticsStartRow + 3)
        val maxStatisticsRow: Row = sheet.createRow(statisticsStartRow + 4)
        val minStatisticsRow: Row = sheet.createRow(statisticsStartRow + 5)
        val avStatisticsRow: Row = sheet.createRow(statisticsStartRow + 6)

        textCell("Summary", statisticHeaderRow, 1, headerCellStyle)
        textCell("MAX value", maxStatisticsRow, 2, dataCellStyle)
        textCell("MIN value", minStatisticsRow, 2, dataCellStyle)
        textCell("Average value", avStatisticsRow, 2, dataCellStyle)
        textCell("The most frequent value", frequentStatisticsRow, 2, dataCellStyle)
        textCell("The most rear value", rearStatisticsRow, 2, dataCellStyle)

        for (col in parsedQuestions.indices)
            formQuestionStatistics(parsedQuestions[col],
                    listOf(frequentStatisticsRow, rearStatisticsRow, maxStatisticsRow, minStatisticsRow, avStatisticsRow),
                    col + 3, dataCellStyle)


        // #COLUMN_WIDTH_SETTING
        for (col in parsedQuestions.indices)
            when (parsedQuestions[col].type) {
                QuestionTypes.fileUpload, QuestionTypes.freeText, QuestionTypes.checkbox -> sheet.setColumnWidth(col + 3, LETTER_WIDTH * 25)
                QuestionTypes.scale, QuestionTypes.radio, QuestionTypes.date -> sheet.setColumnWidth(col + 3, LETTER_WIDTH * 20)
            }
        sheet.setColumnWidth(1, LETTER_WIDTH * 3)
        sheet.setColumnWidth(2, LETTER_WIDTH * 20)
    }

    fun generateQuestionsPage(workbook: XSSFWorkbook, parsedQuestions: List<QuestionDB>, report: DataForReport) {
        val questionsSheet = workbook.createSheet("Questions")

        questionsSheet.setColumnWidth(1, LETTER_WIDTH * 25)
        questionsSheet.setColumnWidth(2, LETTER_WIDTH * 25)
        questionsSheet.setColumnWidth(3, LETTER_WIDTH * 10)

        val titleRow: Row = questionsSheet.createRow(1)
        titleRow.heightInPoints = 55.toFloat()
        textCell(report.questionnaire.title + " questionnaire report", titleRow, 1, titleCellStyle)
        questionsSheet.addMergedRegion(CellRangeAddress(VERTICAL_INDENT, VERTICAL_INDENT, HORIZONTAL_INDENT, 3))
    }

}