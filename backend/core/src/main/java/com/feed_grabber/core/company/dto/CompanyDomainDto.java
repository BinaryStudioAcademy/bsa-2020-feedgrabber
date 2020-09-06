package com.feed_grabber.core.company.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CompanyDomainDto {
    private UUID id;
    private String name;
    private String subdomainName;
    private String emailDomain;
}
