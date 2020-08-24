package com.feed_grabber.event_processor.report.excel

import com.feed_grabber.event_processor.report.dto.QuestionWithValues
import org.apache.poi.ss.usermodel.CellType
import org.apache.poi.ss.usermodel.Row
import org.apache.poi.xssf.usermodel.XSSFCellStyle
import org.apache.poi.xssf.usermodel.XSSFColor
import java.awt.Color

fun indexesToCellName(column: Int, row: Int): String {
    return indexToColumnName(column) + row
}

fun indexToColumnName(index: Int): String? {
    var index = index
    val s = StringBuilder()
    while (index >= 26) {
        s.insert(0, ('A'.toInt() + index % 26).toChar())
        index = index / 26 - 1
    }
    s.insert(0, ('A'.toInt() + index).toChar())
    return s.toString()
}

fun numericCell(value: Double, row: Row, cellPosition: Int, cellStyle: XSSFCellStyle) {
    val cell = row.createCell(cellPosition)
    cell.setCellValue(value)
    cell.cellType = CellType.NUMERIC
    cell.cellStyle = cellStyle
}

fun textCell(value: String, row: Row, cellPosition: Int, cellStyle: XSSFCellStyle) {
    val cell = row.createCell(cellPosition)
    cell.setCellValue(value)
    cell.cellType = CellType.STRING
    cell.cellStyle = cellStyle
}

fun errorCell(row: Row, cellPosition: Int, cellStyle: XSSFCellStyle) {
    cellStyle.setFillForegroundColor(XSSFColor(Color(236, 120, 120)))
    textCell("", row, cellPosition, cellStyle)
}

fun formulaCell(formula: String, row: Row, cellPosition: Int, cellStyle: XSSFCellStyle) {
    val cell = row.createCell(cellPosition)
    cell.cellFormula = formula
    cell.cellType = CellType.FORMULA
    cell.cellStyle = cellStyle
}

fun countAnswersInQuestionWithValues(question: QuestionWithValues): MutableMap<String, Int> {
    var answers: MutableMap<String, Int> = mutableMapOf();
    question.values.distinct().forEach { v -> answers.put(v, 0) }
    question.values.forEach { v -> answers.put(v, 1 + answers.getValue(v)) }
    return answers;
}