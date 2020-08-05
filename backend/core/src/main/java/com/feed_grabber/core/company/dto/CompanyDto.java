package com.feed_grabber.core.company.dto;

import com.feed_grabber.core.company.Company;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class CompanyDto {
    private UUID id;
    private String name;
    private String address;
    private String phoneNumber;
    private String email;

    public static CompanyDto fromEntity(Company company) {
        return CompanyDto.builder()
                .id(company.getId())
                .name(company.getName())
                .address(company.getAddress())
                .phoneNumber(company.getPhoneNumber())
                .email(company.getCorporateEmail())
                .build();
    }
}
