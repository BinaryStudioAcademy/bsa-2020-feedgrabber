package com.feed_grabber.event_processor.report.ppt

import org.apache.poi.xslf.usermodel.SlideLayout
import org.apache.poi.xslf.usermodel.XMLSlideShow
import org.apache.poi.xslf.usermodel.XSLFSlide
import org.apache.poi.xslf.usermodel.XSLFSlideMaster
import java.awt.Dimension
import java.io.File
import java.io.FileOutputStream


fun main(args: Array<String>) {

    // blank slide
    val ppt = XMLSlideShow()

    val blankSlide: XSLFSlide = ppt.createSlide()

    val defaultMaster: XSLFSlideMaster = ppt.getSlideMasters().get(0)

    val layout = defaultMaster.getLayout(SlideLayout.CHART_AND_TEXT)
    val slide1: XSLFSlide = ppt.createSlide(layout)

    //slide1.get
//    val slide1: XSLFSlide = ppt.createSlide(titleLayout)
//    val title1 = slide1.getPlaceholder(0)
//    title1.text = "First Title"
//    val title3 = slide1.getPlaceholder(1)
//    title3.text = "subtitle"
//    slide1.appendContent()
//
//    var p1 =
//    var r = p1.addNewTextRun()
//    r.setText("question name");
//
//    val titleBodyLayout = defaultMaster.getLayout(SlideLayout.TITLE_AND_CONTENT)
//    val slide2: XSLFSlide = ppt.createSlide(titleBodyLayout)

//    val title2 = slide2.getPlaceholder(0)
//    title2.text = "Second Title"
//    val body2 = slide2.getPlaceholder(1)
//    body2.clearText() // unset any existing text
//
//
//
//    ppt.pageSize = Dimension(2000, 2000)
        //saving the changes to a file
    //creating an FileOutputStream object
    val file = File("example1.pptx");
    val out = FileOutputStream(file);

    //saving the changes to a file
    ppt.write(out);
    println("Presentation created successfully");
    out.close()

}

