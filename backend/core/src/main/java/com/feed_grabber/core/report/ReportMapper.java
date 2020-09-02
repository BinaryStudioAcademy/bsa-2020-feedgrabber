package com.feed_grabber.core.report;

import com.feed_grabber.core.company.CompanyMapper;
import com.feed_grabber.core.questionnaire.QuestionnaireMapper;
import com.feed_grabber.core.report.dto.ReportDetailsDto;
import com.feed_grabber.core.report.dto.ReportShortDto;
import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.user.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = {QuestionnaireMapper.class, UserMapper.class, CompanyMapper.class})
public interface ReportMapper {
    ReportMapper MAPPER = Mappers.getMapper(ReportMapper.class);

    @Mapping(source = "questionnaire", target = "questionnaire")
    @Mapping(source = "expirationDate", target = "requestExpirationDate")
    @Mapping(source = "creationDate", target = "requestCreationDate")
    @Mapping(source = "id", target = "requestId")
    @Mapping(source = "excelReport.link", target = "excelReportLink")
    @Mapping(source = "powerPointReport.link", target = "pptReportLink")
    ReportDetailsDto requestToReportDetails(Request request);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "closeDate", target = "closeDate")
    @Mapping(source = "questionnaire.title", target = "title")
    @Mapping(source = "requestMaker.username", target = "author")
    ReportShortDto requestToReportShort(Request request);
}
