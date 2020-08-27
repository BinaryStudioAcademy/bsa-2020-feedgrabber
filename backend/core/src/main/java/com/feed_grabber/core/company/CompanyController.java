package com.feed_grabber.core.company;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.dto.CompanyDomainDto;
import com.feed_grabber.core.company.dto.CompanyDto;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.apiContract.AppResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/company")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService userService) {
        this.companyService = userService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<CompanyDto> getCompanyDetails() {
        var id = TokenService.getCompanyId();
        return new AppResponse<>(companyService.getById(id).orElseThrow());
    }

    @GetMapping("/user-companies")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<CompanyDomainDto>> getCompaniesByEmail(@RequestParam String email) {
        return new AppResponse<>(companyService.getByUserEmail(email));
    }


    @GetMapping("/user")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<CompanyDomainDto> getCompanyFromToken() throws CompanyNotFoundException {
        var id = TokenService.getCompanyId();
        return new AppResponse<>(companyService.getCompanyDomain(id));
    }
}
