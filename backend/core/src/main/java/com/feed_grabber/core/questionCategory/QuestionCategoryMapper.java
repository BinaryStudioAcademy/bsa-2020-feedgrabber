package com.feed_grabber.core.questionCategory;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.questionCategory.dto.QuestionCategoryCreateDto;
import com.feed_grabber.core.questionCategory.dto.QuestionCategoryDto;
import com.feed_grabber.core.questionCategory.model.QuestionCategory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface QuestionCategoryMapper {
    QuestionCategoryMapper MAPPER = Mappers.getMapper(QuestionCategoryMapper.class);

    @Mapping(source = "company.name", target = "companyName")
    QuestionCategoryDto questionCategoryToQuestionCategoryDto(QuestionCategory questionCategory);

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "company", target = "company")
    @Mapping(source = "createDto.title", target = "title")
    QuestionCategory questionCategoryCreateDtoToModel(QuestionCategoryCreateDto createDto, Company company);
}
