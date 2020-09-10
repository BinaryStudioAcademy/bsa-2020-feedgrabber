package com.feed_grabber.event_processor.report.excel

import com.feed_grabber.event_processor.fileStorage.AmazonS3ClientService
import com.feed_grabber.event_processor.rabbit.Sender
import com.feed_grabber.event_processor.report.ReportService
import com.feed_grabber.event_processor.report.dto.*
import com.feed_grabber.event_processor.report.model.QuestionDB
import org.apache.poi.ss.usermodel.*
import org.apache.poi.ss.util.CellRangeAddress
import org.apache.poi.xssf.usermodel.XSSFCellStyle
import org.apache.poi.xssf.usermodel.XSSFConditionalFormattingRule
import org.apache.poi.xssf.usermodel.XSSFFont
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.bouncycastle.asn1.x500.style.RFC4519Style.title
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.io.*
import java.time.LocalDate
import java.util.*
import java.util.stream.Collectors


@Service
class ExcelReportGenerator(@Autowired private val service: ReportService,
                           @Autowired private val client: AmazonS3ClientService) {
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
                val mostCommon = answers.options.filter { a -> a.amount == maxAmount }.sortedBy { it.amount }.map { "${it.title} - ${it.amount} time(s)" }.joinToString(",\n") { it }
                val leastCommon = answers.options.filter { a -> a.amount == minAmount }.sortedBy { it.amount }.map { "${it.title} - ${it.amount} time(s)" }.joinToString(",\n") { it }
                textCell(mostCommon, rows[0], cellPosition, cellStyle)
                textCell(leastCommon, rows[1], cellPosition, cellStyle)
                textCell("-", rows[2], cellPosition, cellStyle)
                textCell("-", rows[3], cellPosition, cellStyle)
                textCell("-", rows[4], cellPosition, cellStyle)
            }
            QuestionTypes.scale -> {
                val answers = service.mapAnswers(QuestionTypes.scale, question.answers) as QuestionWithOptions
                val maxAmount = answers.options.map { it.amount }.max()
                val minAmount = answers.options.map { it.amount }.min()
                val mostCommon = answers.options.filter { a -> a.amount == maxAmount }.sortedBy { it.amount }.map { "${it.title} - ${it.amount} time(s)" }.joinToString(",\n") { it }
                val leastCommon = answers.options.filter { a -> a.amount == minAmount }.sortedBy { it.amount }.map { "${it.title} - ${it.amount} time(s)" }.joinToString(",\n") { it }
                textCell(mostCommon, rows[0], cellPosition, cellStyle)
                textCell(leastCommon, rows[1], cellPosition, cellStyle)
                numericCell(answers.options.stream().map { it.title.toDouble() }.max(Double::compareTo).get(), rows[2], cellPosition, cellStyle)
                numericCell(answers.options.stream().map { it.title.toDouble() }.min(Double::compareTo).get(), rows[3], cellPosition, cellStyle)
                numericCell(answers.options.stream().mapToDouble { it.title.toDouble() }.sum()/answers.options.size, rows[4], cellPosition, cellStyle)
            }
            QuestionTypes.date -> {
                val answers = service.mapAnswers(QuestionTypes.date, question.answers) as QuestionWithOptions
                val maxAmount = answers.options.map { it.amount }.max()
                val minAmount = answers.options.map { it.amount }.min()
                val mostCommon = answers.options.filter { a -> a.amount == maxAmount }.sortedBy { it.amount }.map { "${it.title} - ${it.amount} time(s)" }.joinToString(",\n") { it }
                val leastCommon = answers.options.filter { a -> a.amount == minAmount }.sortedBy { it.amount }.map { "${it.title} - ${it.amount} time(s)" }.joinToString(",\n") { it }
                textCell(mostCommon, rows[0], cellPosition, cellStyle)
                textCell(leastCommon, rows[1], cellPosition, cellStyle)
                textCell(answers.options.map { v -> LocalDate.parse(v.title) }.max().toString(), rows[2], cellPosition, cellStyle)
                textCell(answers.options.map { v -> LocalDate.parse(v.title) }.min().toString(), rows[3], cellPosition, cellStyle)
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


    fun generate(report: DataForReport): ReportFileCreationDto? {
        val parsedQuestions = service.parseIncomingData(report).questions ?: return null
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

        generateInfoPage(workbook, report)

        val stream = ByteArrayOutputStream()
        workbook.write(stream)
        workbook.close()
        val inputStream: InputStream = ByteArrayInputStream(stream.toByteArray())
        val response = client.uploadReport(inputStream, report.requestId, "${UUID.randomUUID()}-report.xlsx")
        return response
    }

    fun generateMainPage(workbook: XSSFWorkbook, parsedQuestions: List<QuestionDB>, report: DataForReport) {
        val headers = mutableListOf("#", "respondent")
        headers.addAll(parsedQuestions.map { q -> q.title })
        val questionsNumber = parsedQuestions.size
        val columnsNumber = headers.size
        val rowsNumber = report.responses.size
        val statisticsStartRow = rowsNumber + VERTICAL_INDENT + 4;

        val sheet = workbook.createSheet("Collected data")

        // #TITLE
        val titleRow: Row = sheet.createRow(1)
        titleRow.heightInPoints = 55.toFloat()
        textCell(report.questionnaire.title + " questionnaire report", titleRow, 1, titleCellStyle)
        sheet.addMergedRegion(CellRangeAddress(VERTICAL_INDENT, VERTICAL_INDENT, HORIZONTAL_INDENT, columnsNumber))

        // #HEADER
        val headerRow: Row = sheet.createRow(2)
        for (col in headers.indices)
            textCell(headers[col], headerRow, col + 1, headerCellStyle)


        // #RESPONSEs
        val sortedResponses = report.responses.sortedBy { it.user.username }
        for (row in sortedResponses.indices) {
            val responseRow: Row = sheet.createRow(row + 3)

            numericCell(row.toDouble() + 1, responseRow, 1, dataCellStyle)

            textCell(sortedResponses[row].user.username, responseRow, 2, dataCellStyle)
            if (sortedResponses[row].payloadList != null)
                for (col in sortedResponses[row].payloadList!!.indices)
                    answerCell(sortedResponses[row].payloadList!!.get(col), responseRow, col + 3, dataCellStyle)
            else
                for (col in 0..questionsNumber)
                    errorCell(responseRow, col + 3, dataCellStyle)
        }

        // #STATS
        val statisticHeaderRow: Row = sheet.createRow(statisticsStartRow)
        statisticHeaderRow.heightInPoints = 20.toFloat()
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


        // #SHEET
        sheet.isPrintGridlines = false;
        sheet.isDisplayGridlines = false;

        val sheetCF = sheet.sheetConditionalFormatting
        val responsesRule: XSSFConditionalFormattingRule = sheetCF.createConditionalFormattingRule("MOD(ROW(),2)=0")
        val responsesFormatingPattern = responsesRule.createPatternFormatting()
        responsesFormatingPattern.fillBackgroundColor = IndexedColors.GREY_25_PERCENT.index
        responsesFormatingPattern.fillPattern = PatternFormatting.SOLID_FOREGROUND

        val statsRule: XSSFConditionalFormattingRule = sheetCF.createConditionalFormattingRule("MOD(ROW(),2)=0")
        val statsFormatingPattern = statsRule.createPatternFormatting()

        statsFormatingPattern.fillBackgroundColor = IndexedColors.GREY_25_PERCENT.index
        statsFormatingPattern.fillPattern = PatternFormatting.SOLID_FOREGROUND

        val cfRules = arrayOf<ConditionalFormattingRule>(statsRule, responsesRule)
        val regions = arrayOf(CellRangeAddress(2, rowsNumber + 2, 1, columnsNumber), CellRangeAddress(statisticsStartRow + 2, statisticsStartRow + 6, 3, (if (columnsNumber>3) columnsNumber else 3)))
        sheetCF.addConditionalFormatting(regions, cfRules)

        sheet.createFreezePane(0, 3)
        for (col in parsedQuestions.indices)
            when (parsedQuestions[col].type) {
                QuestionTypes.fileUpload, QuestionTypes.freeText, QuestionTypes.checkbox -> sheet.setColumnWidth(col + 3, LETTER_WIDTH * 25)
                QuestionTypes.scale, QuestionTypes.radio, QuestionTypes.date -> sheet.setColumnWidth(col + 3, LETTER_WIDTH * 20)
            }
        sheet.setColumnWidth(1, LETTER_WIDTH * 3)
        sheet.setColumnWidth(2, LETTER_WIDTH * 20)
    }

    fun generateQuestionsPage(workbook: XSSFWorkbook, parsedQuestions: List<QuestionDB>, report: DataForReport) {
        val headers = mutableListOf("questions", "question type", "answers", "selected")

        val sheet = workbook.createSheet("Questions")

        // #TITLE
        val titleRow: Row = sheet.createRow(1)
        titleRow.heightInPoints = 55.toFloat()
        textCell(report.questionnaire.title + " questionnaire report", titleRow, 1, titleCellStyle)
        sheet.addMergedRegion(CellRangeAddress(VERTICAL_INDENT, VERTICAL_INDENT, HORIZONTAL_INDENT, 4))

        // #HEADER
        val headerRow: Row = sheet.createRow(2)
        for (col in headers.indices)
            textCell(headers[col], headerRow, col + 1, headerCellStyle)

        var rowLine = 3;

        for (question in parsedQuestions) {
            when (question.type) {
                QuestionTypes.checkbox, QuestionTypes.scale, QuestionTypes.radio -> {
                    var answers: QuestionWithOptions;
                    if (question.type == QuestionTypes.checkbox)
                        answers = service.mapAnswers(QuestionTypes.checkbox, question.answers) as QuestionWithOptions
                    else if (question.type == QuestionTypes.radio)
                        answers = service.mapAnswers(QuestionTypes.radio, question.answers) as QuestionWithOptions
                    else
                        answers = service.mapAnswers(QuestionTypes.scale, question.answers) as QuestionWithOptions
                    sheet.addMergedRegion(CellRangeAddress(rowLine, rowLine + answers.options.size, 1, 1))
                    sheet.addMergedRegion(CellRangeAddress(rowLine, rowLine + answers.options.size, 2, 2))

                    for (answer in answers.options.sortedByDescending { it.amount }) {
                        val row: Row = sheet.createRow(rowLine)
                        textCell(question.title, row, 1, dataCellStyle)
                        textCell(question.type.name, row, 2, dataCellStyle)
                        textCell(answer.title, row, 3, dataCellStyle)
                        textCell("${answer.amount} time(s)", row, 4, dataCellStyle)
                        rowLine++
                    }
                }
                QuestionTypes.date -> {
                    val answers = service.mapAnswers(QuestionTypes.date, question.answers) as QuestionWithOptions
                    sheet.addMergedRegion(CellRangeAddress(rowLine, rowLine + answers.options.size, 1, 1))
                    sheet.addMergedRegion(CellRangeAddress(rowLine, rowLine + answers.options.size, 2, 2))
                    for (answer in answers.options) {
                        val row: Row = sheet.createRow(rowLine)
                        textCell(question.title, row, 1, dataCellStyle)
                        textCell(question.type.name, row, 2, dataCellStyle)
                        textCell(answer.title, row, 3, dataCellStyle)
                        textCell("${answer.amount} time(s)", row, 4, dataCellStyle)
                        rowLine++
                    }
                }
                QuestionTypes.freeText, QuestionTypes.fileUpload -> {
                    val answers: QuestionWithValues;
                    if (question.type == QuestionTypes.freeText)
                        answers = service.mapAnswers(QuestionTypes.freeText, question.answers) as QuestionWithValues
                    else
                        answers = service.mapAnswers(QuestionTypes.fileUpload, question.answers) as QuestionWithValues
                    sheet.addMergedRegion(CellRangeAddress(rowLine, rowLine + answers.values.size, 1, 1))
                    sheet.addMergedRegion(CellRangeAddress(rowLine, rowLine + answers.values.size, 2, 2))
                    for (answer in answers.values) {
                        val row: Row = sheet.createRow(rowLine)
                        textCell(question.title, row, 1, dataCellStyle)
                        textCell(question.type.name, row, 2, dataCellStyle)
                        textCell(answer, row, 3, dataCellStyle)
                        textCell("-", row, 4, dataCellStyle)
                        rowLine++
                    }
                }
            }
            rowLine++
        }

        // #SHEET
        sheet.setColumnWidth(1, LETTER_WIDTH * 25)
        sheet.setColumnWidth(2, LETTER_WIDTH * 20)
        sheet.setColumnWidth(3, LETTER_WIDTH * 25)
        sheet.setColumnWidth(4, LETTER_WIDTH * 10)
        sheet.isPrintGridlines = false;
        sheet.isDisplayGridlines = false;
        val sheetCF = sheet.sheetConditionalFormatting
        val questionsRule: XSSFConditionalFormattingRule = sheetCF.createConditionalFormattingRule("MOD(ROW(),2)=0")
        val questionsFormatingPattern = questionsRule.createPatternFormatting()
        questionsFormatingPattern.fillBackgroundColor = IndexedColors.GREY_25_PERCENT.index
        questionsFormatingPattern.fillPattern = PatternFormatting.SOLID_FOREGROUND
        val cfRules = arrayOf<ConditionalFormattingRule>(questionsRule)
        val regions = arrayOf(CellRangeAddress(3, rowLine, 3, 4))
        sheetCF.addConditionalFormatting(regions, cfRules)
        sheet.createFreezePane(0, 3)

    }

    fun generateInfoPage(workbook: XSSFWorkbook, report: DataForReport) {
        val sheet = workbook.createSheet("Report info")

        // #TITLE
        val titleRow: Row = sheet.createRow(1)
        titleRow.heightInPoints = 55.toFloat()
        textCell("Report info", titleRow, 1, titleCellStyle)
        sheet.addMergedRegion(CellRangeAddress(VERTICAL_INDENT, VERTICAL_INDENT, HORIZONTAL_INDENT, 2))

        // #INFO
        val nameRow: Row = sheet.createRow(3)
        nameRow.heightInPoints = 20.toFloat()
        textCell("Questionnaire name", nameRow, 1, dataCellStyle)
        textCell(report.questionnaire.title, nameRow, 2, dataCellStyle)

        val answersRow: Row = sheet.createRow(4)
        answersRow.heightInPoints = 20.toFloat()
        textCell("Answers", answersRow, 1, dataCellStyle)
        numericCell(report.responses.size.toDouble(), answersRow, 2, dataCellStyle)

        val creationDateRow: Row = sheet.createRow(5)
        creationDateRow.heightInPoints = 20.toFloat()
        textCell("Creation date", creationDateRow, 1, dataCellStyle)
        textCell(report.requestCreationDate.toString(), creationDateRow, 2, dataCellStyle)

        val expirationDateRow: Row = sheet.createRow(6)
        expirationDateRow.heightInPoints = 20.toFloat()
        textCell("Expiration date", expirationDateRow, 1, dataCellStyle)
        textCell(report.requestExpirationDate.toString(), expirationDateRow, 2, dataCellStyle)

        val makerUserRow: Row = sheet.createRow(7)
        makerUserRow.heightInPoints = 20.toFloat()
        textCell("Request maker", makerUserRow, 1, dataCellStyle)
        textCell(report.requestMaker.username, makerUserRow, 2, dataCellStyle)

        if (report.targetUser != null) {
            val targetUserRow: Row = sheet.createRow(8)
            targetUserRow.heightInPoints = 20.toFloat()
            textCell("Target user", targetUserRow, 1, dataCellStyle)
            textCell(report.targetUser.username, targetUserRow, 2, dataCellStyle)
        }
        // #SHEET
        sheet.setColumnWidth(1, LETTER_WIDTH * 25)
        sheet.setColumnWidth(2, LETTER_WIDTH * 25)
        sheet.isPrintGridlines = false;
        sheet.isDisplayGridlines = false;
        val sheetCF = sheet.sheetConditionalFormatting
        val questionsRule: XSSFConditionalFormattingRule = sheetCF.createConditionalFormattingRule("MOD(ROW(),2)=0")
        val questionsFormatingPattern = questionsRule.createPatternFormatting()
        questionsFormatingPattern.fillBackgroundColor = IndexedColors.GREY_25_PERCENT.index
        questionsFormatingPattern.fillPattern = PatternFormatting.SOLID_FOREGROUND
        val cfRules = arrayOf<ConditionalFormattingRule>(questionsRule)
        val regions = arrayOf(CellRangeAddress(3, 8, 1, 2))
        sheetCF.addConditionalFormatting(regions, cfRules)
    }
}
