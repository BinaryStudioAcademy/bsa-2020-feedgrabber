package com.feed_grabber.core.company.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CompanyEmailUpdateDto {
    UUID id;
    String emailDomain;
}
