package com.feed_grabber.event_processor.report.ppt

import org.apache.poi.ooxml.POIXMLDocumentPart
import org.apache.poi.ooxml.POIXMLTypeLoader
import org.apache.poi.openxml4j.opc.PackagePart
import org.apache.poi.openxml4j.opc.PackagingURIHelper
import org.apache.poi.sl.usermodel.Placeholder
import org.apache.poi.util.Units
import org.apache.poi.xslf.usermodel.XMLSlideShow
import org.apache.poi.xslf.usermodel.XSLFRelation
import org.apache.poi.xslf.usermodel.XSLFSlide
import org.apache.poi.xslf.usermodel.XSLFTextBox
import org.apache.xmlbeans.XmlOptions
import org.openxmlformats.schemas.drawingml.x2006.chart.CTChartSpace
import org.openxmlformats.schemas.drawingml.x2006.chart.ChartSpaceDocument
import org.openxmlformats.schemas.drawingml.x2006.chart.STLegendPos
import org.openxmlformats.schemas.drawingml.x2006.main.CTGraphicalObjectData
import org.openxmlformats.schemas.presentationml.x2006.main.CTGraphicalObjectFrame
import org.springframework.stereotype.Service
import java.awt.Color
import java.awt.Rectangle
import java.awt.geom.Rectangle2D
import java.io.FileOutputStream
import java.io.IOException
import java.math.RoundingMode
import java.util.regex.Pattern
import javax.xml.namespace.QName

@Service
class ChartSlide {

    @Throws(Exception::class)
    fun createXSLFChart(slide: XSLFSlide): CustomChartShape {
        val oPCPackage = slide.slideShow.getPackage()
        val chartCount = oPCPackage.getPartsByName(Pattern.compile("/ppt/charts/chart.*")).size + 1
        val partName = PackagingURIHelper.createPartName("/ppt/charts/chart$chartCount.xml")
        val part = oPCPackage.createPart(partName, "application/vnd.openxmlformats-officedocument.drawingml.chart+xml")
        val myXSLFChart = CustomXSLFChart(part)
        return CustomChartShape(slide, myXSLFChart)
    }

    private fun drawPieChart(xSLFChartShape: CustomChartShape, values: Map<String, Int>) {
        val chartSpace: CTChartSpace = xSLFChartShape.customXSLFChart.chartSpace
        val cTChart = chartSpace.addNewChart()
        val cTPlotArea = cTChart.addNewPlotArea()
        val cTPieChart = cTPlotArea.addNewPieChart()

        cTPieChart.addNewVaryColors().setVal(true)
        val cTPieSer = cTPieChart.addNewSer()
        cTPieSer.addNewIdx().setVal(0)
        var cTStrRef = cTPieSer.addNewTx().addNewStrRef()
        cTStrRef.f = "Label 0"
        cTStrRef.addNewStrCache().addNewPtCount().setVal(1)
        var cTStrVal = cTStrRef.strCache.addNewPt()
        cTStrVal.idx = 0
        cTStrVal.v = "Val"
        cTStrRef = cTPieSer.addNewCat().addNewStrRef()
        cTStrRef.f = "Categories"
        cTStrRef.addNewStrCache().addNewPtCount().setVal(3)

        val optionsSum = getOptionsSum(values.values)
        values.keys.forEachIndexed{ i, name ->
            cTStrVal = cTStrRef.strCache.addNewPt()
            cTStrVal.idx = i.toLong()
            val percentPart = getPercent(optionsSum, values[name]!!)
            cTStrVal.v = "$name $percentPart%"
        }
        val cTNumRef = cTPieSer.addNewVal().addNewNumRef()
        cTNumRef.f = "0"
        cTNumRef.addNewNumCache().addNewPtCount().setVal(3)

        values.values.forEachIndexed{ i, value ->
            val cTNumVal = cTNumRef.numCache.addNewPt()
            cTNumVal.idx = i.toLong()
            cTNumVal.v = "" + 10 * value
        }

        val cTLegend = cTChart.addNewLegend()
        cTLegend.addNewLegendPos().setVal(STLegendPos.R)
        cTLegend.addNewOverlay().setVal(false)
    }

    private fun getOptionsSum(options: Collection<Int>): Int {
        return options.sum()
    }

    private fun getPercent(sum: Int, part: Int): Double {
        val result: Double = part.toDouble()/sum * 100
        return result.toBigDecimal().setScale(2, RoundingMode.HALF_UP).toDouble()
    }

//    fun drawBarChart(myXSLFChartShape: MyXSLFChartShape) {
//        val chartSpace: CTChartSpace = myXSLFChartShape.myXSLFChart.chartSpace
//        val cTChart = chartSpace.addNewChart()
//        val cTPlotArea = cTChart.addNewPlotArea()
//        val cTBarChart = cTPlotArea.addNewBarChart()
//        cTBarChart.addNewVaryColors().setVal(true)
//        cTBarChart.addNewBarDir().setVal(STBarDir.COL)
//        for (r in 1..4) {
//            val cTBarSer = cTBarChart.addNewSer()
//            var cTStrRef = cTBarSer.addNewTx().addNewStrRef()
//            cTStrRef.f = "Label $r"
//            cTStrRef.addNewStrCache().addNewPtCount().setVal(1)
//            var cTStrVal = cTStrRef.strCache.addNewPt()
//            cTStrVal.idx = 0
//            cTStrVal.v = "Val$r"
//            cTBarSer.addNewIdx().setVal(r - 1.toLong())
//            cTStrRef = cTBarSer.addNewCat().addNewStrRef()
//            cTStrRef.f = "Categories"
//            cTStrRef.addNewStrCache().addNewPtCount().setVal(3)
//            for (c in 1..3) {
//                cTStrVal = cTStrRef.strCache.addNewPt()
//                cTStrVal.idx = c - 1.toLong()
//                cTStrVal.v = "Cat$c"
//            }
//            val cTNumRef = cTBarSer.addNewVal().addNewNumRef()
//            cTNumRef.f = "" + r
//            cTNumRef.addNewNumCache().addNewPtCount().setVal(3)
//            for (c in 1..3) {
//                val cTNumVal = cTNumRef.numCache.addNewPt()
//                cTNumVal.idx = c - 1.toLong()
//                cTNumVal.v = "" + (10 + r) * c
//            }
//        }
//
//        //telling the BarChart that it has axes and giving them Ids
//        cTBarChart.addNewAxId().setVal(123456)
//        cTBarChart.addNewAxId().setVal(123457)
//
//        //cat axis
//        val cTCatAx = cTPlotArea.addNewCatAx()
//        cTCatAx.addNewAxId().setVal(123456) //id of the cat axis
//        var cTScaling = cTCatAx.addNewScaling()
//        cTScaling.addNewOrientation().setVal(STOrientation.MIN_MAX)
//        cTCatAx.addNewDelete().setVal(false)
//        cTCatAx.addNewAxPos().setVal(STAxPos.B)
//        cTCatAx.addNewCrossAx().setVal(123457) //id of the val axis
//        cTCatAx.addNewTickLblPos().setVal(STTickLblPos.NEXT_TO)
//
//        //val axis
//        val cTValAx = cTPlotArea.addNewValAx()
//        cTValAx.addNewAxId().setVal(123457) //id of the val axis
//        cTScaling = cTValAx.addNewScaling()
//        cTScaling.addNewOrientation().setVal(STOrientation.MIN_MAX)
//        cTValAx.addNewDelete().setVal(false)
//        cTValAx.addNewAxPos().setVal(STAxPos.L)
//        cTValAx.addNewCrossAx().setVal(123456) //id of the cat axis
//        cTValAx.addNewTickLblPos().setVal(STTickLblPos.NEXT_TO)
//
//        //legend
//        val cTLegend = cTChart.addNewLegend()
//        cTLegend.addNewLegendPos().setVal(STLegendPos.B)
//        cTLegend.addNewOverlay().setVal(false)
//    }

    //________________________________________________________________________
    //a class for providing a MyXSLFChartShape
    inner class CustomChartShape(slide: XSLFSlide, customXSLFChart: CustomXSLFChart) {
        private val _graphicalObjectFrame: CTGraphicalObjectFrame
        private val slide: XSLFSlide
        val customXSLFChart: CustomXSLFChart


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
            slide.addRelation(rId, XSLFRelation.CHART, customXSLFChart)
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
            this.customXSLFChart = customXSLFChart
            setAnchor(Rectangle())
        }
    }

    //a wrapper class for the ChartSpaceDocument /ppt/charts/chart*.xml in the *.pptx ZIP archive
    inner class CustomXSLFChart(part: PackagePart) : POIXMLDocumentPart(part) {
        val chartSpace: CTChartSpace = ChartSpaceDocument.Factory.newInstance().addNewChartSpace()


        @Throws(IOException::class)
        override fun commit() {
            val xmlOptions = XmlOptions(POIXMLTypeLoader.DEFAULT_XML_OPTIONS)
            xmlOptions.setSaveSyntheticDocumentElement(QName(
                    CTChartSpace.type.name.namespaceURI,
                    "chartSpace",
                    "c"))
            val part = packagePart
            val out = part.outputStream
            chartSpace.save(out, xmlOptions)
            out.close()
        }
    }

//    companion object {
//        @Throws(Exception::class)
//        @JvmStatic
//        fun main(args: Array<String>) {
//            val createPPTXCharts = CreatePPTXCharts()
//        }
//
//    }

    fun createPieChartSlide(slideShow: XMLSlideShow, values: Map<String, Int>, question: String) {
        val slide = slideShow.createSlide()

        val titleShape = slide.createTextBox();
        setTitle(titleShape, question)

        val options = slide.createTextBox();
        setOptionsShape(options, values)

        val myXSLFChartShape = createXSLFChart(slide)
        myXSLFChartShape.setAnchor(Rectangle(320, 120, 350, 350))
        drawPieChart(myXSLFChartShape, values)
    }

    private fun setOptionsShape(shape: XSLFTextBox, values:  Map<String, Int>) {
        shape.anchor = Rectangle(50, 120, 350, 300)
        shape.placeholder = Placeholder.CONTENT;
        values.forEach {entry ->
            val paragraph = shape.addNewTextParagraph()
            // paragraph.bulletCharacter = ""
            val run = paragraph.addNewTextRun()
            run.setText(entry.key + " " + entry.value);
            run.fontSize = 14.0
        }
    }

    private fun setTitle(title: XSLFTextBox, text: String) {
        title.anchor = Rectangle(40, 10, 600, 50)
        title.placeholder = Placeholder.TITLE;
        val p = title.addNewTextParagraph()
        val r = p.addNewTextRun()
        r.setText(text);
        r.setFontColor(Color.decode("#c62828"))
        r.fontSize = 25.0
    }

//    init {
//        val values = mutableMapOf<String, Int>("first fasldf ksaf;sdf sdkfjas sdfa " to 1, "second" to 3, "third" to 4, "five" to 3)
//        val slideShow = XMLSlideShow()
//
//        // myXSLFChartShape = createXSLFChart(slide)
//        // myXSLFChartShape.setAnchor(Rectangle(370, 100, 300, 300))
//        // drawBarChart(myXSLFChartShape)
//        val out = FileOutputStream("CreatePPTXCharts.pptx")
//        slideShow.write(out)
//        out.close()
//    }
}

