package com.feed_grabber.event_processor.report.ppt

// import org.apache.poi.POIXMLTypeLoader.DEFAULT_XML_OPTIONS
import org.apache.poi.ooxml.POIXMLTypeLoader.DEFAULT_XML_OPTIONS

import org.apache.poi.ooxml.POIXMLDocumentPart
import org.apache.poi.ooxml.POIXMLRelation
import org.apache.poi.ooxml.POIXMLTypeLoader
import org.apache.poi.openxml4j.opc.PackagePart
import org.apache.poi.openxml4j.opc.PackagingURIHelper
import org.apache.poi.util.Units
import org.apache.poi.xslf.usermodel.XMLSlideShow
import org.apache.poi.xslf.usermodel.XSLFRelation
import org.apache.poi.xslf.usermodel.XSLFSlide
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.apache.xmlbeans.XmlOptions
import org.openxmlformats.schemas.drawingml.x2006.chart.*
import org.openxmlformats.schemas.drawingml.x2006.main.CTGraphicalObjectData
import org.openxmlformats.schemas.presentationml.x2006.main.CTGraphicalObjectFrame
import java.awt.Rectangle
import java.awt.geom.Rectangle2D
import java.io.FileOutputStream
import java.io.IOException
import java.util.regex.Pattern
import javax.xml.namespace.QName


class CreatePPTXChartsXSSFWb {
    //a method for creating the chart XML document /ppt/charts/chart*.xml in the *.pptx ZIP archive
    //and creating a MyXSLFChartShape as slide shape
    @Throws(Exception::class)
    fun createXSLFChart(slide: XSLFSlide): MyXSLFChartShape {
        val oPCPackage = slide.slideShow.getPackage()
        val chartCount = oPCPackage.getPartsByName(Pattern.compile("/ppt/charts/chart.*")).size + 1
        val partName = PackagingURIHelper.createPartName("/ppt/charts/chart$chartCount.xml")
        val part = oPCPackage.createPart(partName, "application/vnd.openxmlformats-officedocument.drawingml.chart+xml")
        val myXSLFChart = MyXSLFChart(part)
        return MyXSLFChartShape(slide, myXSLFChart)
    }

    fun drawPieChart(myXSLFChartShape: MyXSLFChartShape) {
        val workbook: XSSFWorkbook = myXSLFChartShape.myXSLFChart.xSLFXSSFWorkbook.xSSFWorkbook
        val sheet = workbook.getSheetAt(0)
        sheet.createRow(0).createCell(0).setCellValue("Cat")
        sheet.getRow(0).createCell(1).setCellValue("Val")
        for (r in 1..3) {
            sheet.createRow(r).createCell(0).setCellValue("Cat$r")
            sheet.getRow(r).createCell(1).setCellValue(10 * r.toDouble())
        }
        val chartSpace: CTChartSpace = myXSLFChartShape.myXSLFChart.chartSpace
        val cTPieChart = chartSpace.addNewChart().addNewPlotArea().addNewPieChart()
        cTPieChart.addNewVaryColors().setVal(true)
        val cTPieSer = cTPieChart.addNewSer()
        cTPieSer.addNewIdx().setVal(0)
        var cTStrRef = cTPieSer.addNewTx().addNewStrRef()
        cTStrRef.f = "Sheet0!\$B$1"
        cTStrRef.addNewStrCache().addNewPtCount().setVal(1)
        var cTStrVal = cTStrRef.strCache.addNewPt()
        cTStrVal.idx = 0
        cTStrVal.v = "Val"
        cTStrRef = cTPieSer.addNewCat().addNewStrRef()
        cTStrRef.f = "Sheet0!\$A$2:\$A$4"
        cTStrRef.addNewStrCache().addNewPtCount().setVal(3)
//        for (r in 1..3) {
//            cTStrVal = cTStrRef.strCache.addNewPt()
//            cTStrVal.idx = r - 1.toLong()
//            cTStrVal.v = "Cat$r"
//        }
        val cTNumRef = cTPieSer.addNewVal().addNewNumRef()
        cTNumRef.f = "Sheet0!\$B$2:\$B$4"
        cTNumRef.addNewNumCache().addNewPtCount().setVal(3)
//        for (r in 1..3) {
//            val cTNumVal = cTNumRef.numCache.addNewPt()
//            cTNumVal.idx = r - 1.toLong()
//            cTNumVal.v = "" + 10 * r
//        }
    }

    fun drawBarChart(myXSLFChartShape: MyXSLFChartShape) {
        val workbook: XSSFWorkbook = myXSLFChartShape.myXSLFChart.xSLFXSSFWorkbook.xSSFWorkbook
        val sheet = workbook.getSheetAt(0)
        sheet.createRow(0)
        for (c in 1..3) {
            sheet.getRow(0).createCell(c).setCellValue("Cat$c")
        }
        for (r in 1..4) {
            sheet.createRow(r).createCell(0).setCellValue("Val$r")
            for (c in 1..3) {
                sheet.getRow(r).createCell(c).setCellValue((10 + r) * c.toDouble())
            }
        }
        val chartSpace: CTChartSpace = myXSLFChartShape.myXSLFChart.chartSpace
        val cTChart = chartSpace.addNewChart()
        val cTPlotArea = cTChart.addNewPlotArea()
        val cTBarChart = cTPlotArea.addNewBarChart()
        cTBarChart.addNewVaryColors().setVal(true)
        cTBarChart.addNewBarDir().setVal(STBarDir.COL)
        for (r in 1..4) {
            val cTBarSer = cTBarChart.addNewSer()
            var cTStrRef = cTBarSer.addNewTx().addNewStrRef()
            cTStrRef.f = "Sheet0!\$A$" + (r + 1)
            cTStrRef.addNewStrCache().addNewPtCount().setVal(1)
            var cTStrVal = cTStrRef.strCache.addNewPt()
            cTStrVal.idx = 0
            cTStrVal.v = "Val$r"
            cTBarSer.addNewIdx().setVal(r - 1.toLong())
            val cttAxDataSource = cTBarSer.addNewCat()
            cTStrRef = cttAxDataSource.addNewStrRef()
            cTStrRef.f = "Sheet0!\$B$1:\$D$1"
            cTStrRef.addNewStrCache().addNewPtCount().setVal(3)
            for (c in 1..3) {
                cTStrVal = cTStrRef.strCache.addNewPt()
                cTStrVal.idx = c - 1.toLong()
                cTStrVal.v = "Cat$c"
            }
            val ctNumDataSource = cTBarSer.addNewVal()
            val cTNumRef = ctNumDataSource.addNewNumRef()
            cTNumRef.f = "Sheet0!\$B$" + (r + 1) + ":\$D$" + (r + 1)
            cTNumRef.addNewNumCache().addNewPtCount().setVal(3)
            for (c in 1..3) {
                val cTNumVal = cTNumRef.numCache.addNewPt()
                cTNumVal.idx = c - 1.toLong()
                cTNumVal.v = "" + (10 + r) * c
            }
        }

        //telling the BarChart that it has axes and giving them Ids
        cTBarChart.addNewAxId().setVal(123456)
        cTBarChart.addNewAxId().setVal(123457)

        //cat axis
        val cTCatAx = cTPlotArea.addNewCatAx()
        cTCatAx.addNewAxId().setVal(123456) //id of the cat axis
        var cTScaling = cTCatAx.addNewScaling()
        cTScaling.addNewOrientation().setVal(STOrientation.MIN_MAX)
        cTCatAx.addNewDelete().setVal(false)
        cTCatAx.addNewAxPos().setVal(STAxPos.B)
        cTCatAx.addNewCrossAx().setVal(123457) //id of the val axis
        cTCatAx.addNewTickLblPos().setVal(STTickLblPos.NEXT_TO)

        //val axis
        val cTValAx = cTPlotArea.addNewValAx()
        cTValAx.addNewAxId().setVal(123457) //id of the val axis
        cTScaling = cTValAx.addNewScaling()
        cTScaling.addNewOrientation().setVal(STOrientation.MIN_MAX)
        cTValAx.addNewDelete().setVal(false)
        cTValAx.addNewAxPos().setVal(STAxPos.L)
        cTValAx.addNewCrossAx().setVal(123456) //id of the cat axis
        cTValAx.addNewTickLblPos().setVal(STTickLblPos.NEXT_TO)

        //legend
        val cTLegend = cTChart.addNewLegend()
        cTLegend.addNewLegendPos().setVal(STLegendPos.B)
        cTLegend.addNewOverlay().setVal(false)
    }

    //a class for providing a MyXSLFChartShape
    inner class MyXSLFChartShape(slide: XSLFSlide, myXSLFChart: MyXSLFChart) {
        private val _graphicalObjectFrame: CTGraphicalObjectFrame
        private val slide: XSLFSlide
        val myXSLFChart: MyXSLFChart

        fun setAnchor(anchor: Rectangle2D) {
            val xfrm = if (_graphicalObjectFrame.xfrm != null) _graphicalObjectFrame.xfrm else _graphicalObjectFrame.addNewXfrm()
            val off = if (xfrm.isSetOff) xfrm.off else xfrm.addNewOff()
            val x = Units.toEMU(anchor.x).toLong()
            val y = Units.toEMU(anchor.y).toLong()
            off.x = x
            off.y = y
            val ext = if (xfrm.isSetExt) xfrm.ext else xfrm.addNewExt()
            val cx = Units.toEMU(anchor.width).toLong()
            val cy = Units.toEMU(anchor.height).toLong()
            ext.cx = cx
            ext.cy = cy
        }


        init {
            val rId = "rId" + (slide.relationParts.size + 1)
            slide.addRelation(rId, XSLFRelation.CHART, myXSLFChart)
            var cNvPrId: Long = 1
            val cNvPrName = "MyChart"
            var cNvPrNameCount = 1
            for (currGraphicalObjectFrame in slide.xmlObject.cSld.spTree.graphicFrameList) {
                if (currGraphicalObjectFrame.nvGraphicFramePr != null) {
                    if (currGraphicalObjectFrame.nvGraphicFramePr.cNvPr != null) {
                        cNvPrId++
                        if (currGraphicalObjectFrame.nvGraphicFramePr.cNvPr.name.startsWith(cNvPrName)) {
                            cNvPrNameCount++
                        }
                    }
                }
            }
            val graphicalObjectFrame = slide.xmlObject.cSld.spTree.addNewGraphicFrame()
            val cTGraphicalObjectFrameNonVisual = graphicalObjectFrame.addNewNvGraphicFramePr()
            cTGraphicalObjectFrameNonVisual.addNewCNvGraphicFramePr()
            cTGraphicalObjectFrameNonVisual.addNewNvPr()
            val cTNonVisualDrawingProps = cTGraphicalObjectFrameNonVisual.addNewCNvPr()
            cTNonVisualDrawingProps.id = cNvPrId
            cTNonVisualDrawingProps.name = "MyChart$cNvPrNameCount"
            val graphicalObject = graphicalObjectFrame.addNewGraphic()
            val graphicalObjectData = CTGraphicalObjectData.Factory.parse(
                    "<c:chart xmlns:c=\"http://schemas.openxmlformats.org/drawingml/2006/chart\" "
                            + "xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" "
                            + "r:id=\"" + rId + "\"/>"
            )
            graphicalObjectData.uri = "http://schemas.openxmlformats.org/drawingml/2006/chart"
            graphicalObject.graphicData = graphicalObjectData
            _graphicalObjectFrame = graphicalObjectFrame
            this.slide = slide
            this.myXSLFChart = myXSLFChart
            setAnchor(Rectangle())
        }
    }

    //a wrapper class for the ChartSpaceDocument /ppt/charts/chart*.xml in the *.pptx ZIP archive
    inner class MyXSLFChart(part: PackagePart) : POIXMLDocumentPart(part) {
        val chartSpace: CTChartSpace
        val xSLFXSSFWorkbook: MyXSLFXSSFWorkbook

        @Throws(IOException::class)
        override fun commit() {
            val xmlOptions = XmlOptions(POIXMLTypeLoader.DEFAULT_XML_OPTIONS)
            xmlOptions.setSaveSyntheticDocumentElement(QName(CTChartSpace.type.name.namespaceURI, "chartSpace", "c"))
            val part = packagePart
            val out = part.outputStream
            chartSpace.save(out, xmlOptions)
            out.close()
        }

        init {
            val oPCPackage = part.getPackage()
            val chartCount = oPCPackage.getPartsByName(Pattern.compile("/ppt/embeddings/.*.xlsx")).size + 1
            val partName = PackagingURIHelper.createPartName("/ppt/embeddings/Microsoft_Excel_Worksheet$chartCount.xlsx")
            val xlsxpart = oPCPackage.createPart(partName, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            xSLFXSSFWorkbook = MyXSLFXSSFWorkbook(xlsxpart)
            val rId = "rId" + (this.relationParts.size + 1)
            val xSLFXSSFRelationPACKAGE = XSLFXSSFRelation(
                    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/package")
            this.addRelation(rId, xSLFXSSFRelationPACKAGE, xSLFXSSFWorkbook)
            chartSpace = ChartSpaceDocument.Factory.newInstance().addNewChartSpace()
            val cTExternalData = chartSpace.addNewExternalData()
            cTExternalData.id = rId
            //cTExternalData.addNewAutoUpdate().setVal(true);
        }
    }

    //a wrapper class for the XSSFWorkbook /ppt/embeddings/Microsoft_Excel_Worksheet*.xlsx in the *.pptx ZIP archive
    inner class MyXSLFXSSFWorkbook(part: PackagePart) : POIXMLDocumentPart(part) {
        val xSSFWorkbook: XSSFWorkbook

        @Throws(IOException::class)
        override fun commit() {
            val part = packagePart
            val out = part.outputStream
            xSSFWorkbook.write(out)
            xSSFWorkbook.close()
            out.close()
        }

        init {
            xSSFWorkbook = XSSFWorkbook()
            val sheet = xSSFWorkbook.createSheet()
        }
    }

    //a class to note the relations
    private inner class XSLFXSSFRelation(rel: String) : POIXMLRelation(null, rel, null)
    companion object {
        @Throws(Exception::class)
        @JvmStatic
        fun main(args: Array<String>) {
            val createPPTXCharts = CreatePPTXChartsXSSFWb()
        }
    }

    init {
        val slideShow = XMLSlideShow()
        val slide = slideShow.createSlide()
        var myXSLFChartShape = createXSLFChart(slide)
        myXSLFChartShape.setAnchor(Rectangle(50, 100, 300, 300))
        drawPieChart(myXSLFChartShape)
        myXSLFChartShape = createXSLFChart(slide)
        myXSLFChartShape.setAnchor(Rectangle(370, 100, 300, 300))
        drawBarChart(myXSLFChartShape)
        val out = FileOutputStream("CreatePPTXChartsXSSFWb.pptx")
        slideShow.write(out)
        out.close()
    }
}
