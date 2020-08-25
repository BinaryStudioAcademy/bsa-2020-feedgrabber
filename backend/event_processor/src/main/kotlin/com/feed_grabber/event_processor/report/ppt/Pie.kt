import org.apache.poi.ss.usermodel.Cell
import org.apache.poi.ss.usermodel.Row
import org.apache.poi.ss.util.CellRangeAddress
import org.apache.poi.ss.util.CellReference
import org.apache.poi.xddf.usermodel.chart.ChartTypes
import org.apache.poi.xddf.usermodel.chart.LegendPosition
import org.apache.poi.xddf.usermodel.chart.XDDFDataSource
import org.apache.poi.xddf.usermodel.chart.XDDFDataSourcesFactory
import org.apache.poi.xssf.usermodel.DefaultIndexedColorMap
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import java.io.FileOutputStream
import java.io.IOException

object PieChart {
//    @Throws(IOException::class)
//    @JvmStatic
    fun main() {
        val categories = arrayOf("Russia", "Canada", "USA")
        val values = arrayOf(170.0, 99.0, 98.0)
        return XSSFWorkbook().use { wb ->
            //the sheet for the chart
            val chartSheet = wb.createSheet("piechart")
            //the sheet for the data
            val dataSheet = wb.createSheet("data")
            //maybe hide the data sheet
            //wb.setSheetHidden(1, true);
            var row: Row
            var cell: Cell
            row = dataSheet.createRow(0)
            cell = row.createCell(1)
            cell.setCellValue("Series")
            for (i in 1..categories.size) {
                row = dataSheet.createRow(i)
                cell = row.createCell(0)
                cell.setCellValue(categories[i - 1])
                cell = row.createCell(1)
                cell.setCellValue(values[i - 1])
            }
            val drawing = chartSheet.createDrawingPatriarch()
            val anchor = drawing.createAnchor(0, 0, 0, 0, 0, 0, 6, 15)
            val chart = drawing.createChart(anchor)
            chart.setTitleText("Chart title")
            chart.setTitleOverlay(false)
            val legend = chart.orAddLegend
            legend.position = LegendPosition.RIGHT
            val cat: XDDFDataSource<String> = XDDFDataSourcesFactory.fromStringCellRange(dataSheet,
                    CellRangeAddress(1, categories.size, 0, 0))
            val `val` = XDDFDataSourcesFactory.fromNumericCellRange(dataSheet,
                    CellRangeAddress(1, categories.size, 1, 1))

            //XDDFChartData data = new XDDFPieChartData(chart.getCTChart().getPlotArea().addNewPieChart());
            val data = chart.createData(ChartTypes.PIE, null, null)
            data.setVaryColors(true)
            val series = data.addSeries(cat, `val`)
            series.setTitle(dataSheet.getRow(0).getCell(1).stringCellValue, CellReference(dataSheet.getRow(0).getCell(1)))
            chart.plot(data)

            // Do not auto delete the title; is necessary for showing title in Calc
            if (chart.ctChart.autoTitleDeleted == null) chart.ctChart.addNewAutoTitleDeleted()
            chart.ctChart.autoTitleDeleted.setVal(false)

            // Data point colors; is necessary for showing data points in Calc
            val pointCount = series.categoryData.pointCount
            for (p in 0 until pointCount) {
                chart.ctChart.plotArea.getPieChartArray(0).getSerArray(0).addNewDPt().addNewIdx().setVal(p.toLong())
                chart.ctChart.plotArea.getPieChartArray(0).getSerArray(0).getDPtArray(p)
                        .addNewSpPr().addNewSolidFill().addNewSrgbClr().setVal(DefaultIndexedColorMap.getDefaultRGB(p + 10))
            }
            //FileOutputStream("ooxml-pie-chart.xlsx").use { fileOut -> wb.write(fileOut) }
        }
    }
}
