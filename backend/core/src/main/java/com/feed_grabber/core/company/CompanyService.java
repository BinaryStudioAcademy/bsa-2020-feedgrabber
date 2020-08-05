package com.feed_grabber.core.company;

import com.feed_grabber.core.company.dto.CompanyDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    public List<CompanyDto> get() {
        return companyRepository
                .findAll()
                .stream()
                .map(CompanyDto::fromEntity)
                .collect(Collectors.toList());
    }

    public Optional<CompanyDto> getById(UUID id) {
        return companyRepository.findById(id).map(CompanyDto::fromEntity);
    }

    public Optional<UUID> create(CompanyDto companyDto) {
        var company = Company.fromDto(companyDto);
        var result = companyRepository.save(company);
        return Optional.of(result.getId());
    }

    public Optional<CompanyDto> update(UUID id, CompanyDto companyDto) {
        var updatedCompany = companyRepository.findById(id).get();
        updatedCompany.setName(companyDto.getName());
        updatedCompany.setAddress(companyDto.getAddress());
        updatedCompany.setPhoneNumber(companyDto.getPhoneNumber());
        updatedCompany.setCorporateEmail(companyDto.getEmail());
        companyRepository.save(updatedCompany);
        return Optional.of(CompanyDto.fromEntity(updatedCompany));
    }

    public void delete(UUID id) {
        companyRepository.deleteById(id);
    }
}
