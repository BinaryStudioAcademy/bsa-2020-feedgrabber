package com.feed_grabber.core.company.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class CompanyDto {
    private UUID id;
    private String name;
    private String address;
    private String phoneNumber;
    private String email;
}
