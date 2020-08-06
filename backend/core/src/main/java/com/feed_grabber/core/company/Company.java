package com.feed_grabber.core.company;

import com.feed_grabber.core.company.dto.CompanyDto;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "companies")
public class Company {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column
    private String name;

    @Column
    private String address;

    @Column
    private String phoneNumber;

    @Column
    private String corporateEmail;

    public static Company fromDto(CompanyDto companyDto) {
        return Company.builder()
                .id(companyDto.getId())
                .name(companyDto.getName())
                .address(companyDto.getAddress())
                .phoneNumber(companyDto.getPhoneNumber())
                .corporateEmail(companyDto.getEmail())
                .build();
    }
}
