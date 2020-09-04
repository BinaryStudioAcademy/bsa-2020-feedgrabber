package com.feed_grabber.core.company;

import com.feed_grabber.core.company.dto.CompanyDomainDto;
import com.feed_grabber.core.company.dto.CompanyDto;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
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
                .map(CompanyMapper.MAPPER::companyToCompanyDto)
                .collect(Collectors.toList());
    }

    public Optional<CompanyDto> getById(UUID id) {
        return companyRepository.findById(id)
                .map(CompanyMapper.MAPPER::companyToCompanyDto);
    }

    public Optional<UUID> create(CompanyDto companyDto) {
        var company = CompanyMapper.MAPPER.companyDtoToModel(companyDto);
        var result = companyRepository.save(company);
        return Optional.of(result.getId());
    }

    public Optional<CompanyDto> update(UUID id, CompanyDto companyDto) {
        if (companyRepository.findById(id).isEmpty()) {
            return Optional.empty();
        }
        var updatedCompany = companyRepository.findById(id).get();
        updatedCompany.setName(companyDto.getName());
        updatedCompany.setAddress(companyDto.getAddress());
        updatedCompany.setPhoneNumber(companyDto.getPhoneNumber());
        updatedCompany.setCorporateEmail(companyDto.getEmail());
        companyRepository.save(updatedCompany);
        return Optional.of(CompanyMapper.MAPPER.companyToCompanyDto(updatedCompany));
    }

    public void delete(UUID id) {
        companyRepository.deleteById(id);
    }

    public List<CompanyDomainDto> getByUserEmail(String email) {
        return companyRepository
                .findAllByUserEmail(email)
                .stream()
                .map(CompanyMapper.MAPPER::companyToCompanyDomainDto)
                .collect(Collectors.toList());
    }

    public CompanyDomainDto getCompanyDomain(UUID id) throws CompanyNotFoundException {
        return companyRepository.findById(id)
                .map(CompanyMapper.MAPPER::companyToCompanyDomainDto)
                .orElseThrow(CompanyNotFoundException::new);
    }

    public CompanyDomainDto getCompanyDomain(String subDomain) throws CompanyNotFoundException {
        return companyRepository.findCompanyBySubdomainName(subDomain)
                .map(CompanyMapper.MAPPER::companyToCompanyDomainDto)
                .orElseThrow(CompanyNotFoundException::new);
    }
}
