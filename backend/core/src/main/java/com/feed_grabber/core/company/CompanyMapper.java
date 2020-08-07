package com.feed_grabber.core.company;

import com.feed_grabber.core.company.dto.CompanyDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CompanyMapper {
    CompanyMapper MAPPER = Mappers.getMapper(CompanyMapper.class);

    @Mapping(source = "corporateEmail", target = "email")
    CompanyDto companyToCompanyDto(Company company);

    @Mapping(source = "email", target = "corporateEmail")
    Company companyDtoToModel(CompanyDto companyDto);
}
