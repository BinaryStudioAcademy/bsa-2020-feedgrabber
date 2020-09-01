package com.feed_grabber.core.company;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.dto.CompanyDomainDto;
import com.feed_grabber.core.company.dto.CompanyDto;
import com.feed_grabber.core.company.dto.CompanyEmailUpdateDto;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.apiContract.AppResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/company")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService userService) {
        this.companyService = userService;
    }

    @ApiOperation(value = "Get user`s company details", notes = "id of the company is got from the token")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<CompanyDto> getCompanyDetails() {
        var id = TokenService.getCompanyId();
        return new AppResponse<>(companyService.getById(id).orElseThrow());
    }

    @ApiOperation(value = "Get list of companies, where user is registered by email", notes = "Provide an email")
    @GetMapping("/user-companies")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<CompanyDomainDto>> getCompaniesByEmail(
            @ApiParam(value = "email as string", required = true)
            @RequestParam String email) {
        return new AppResponse<>(companyService.getByUserEmail(email));
    }

    @ApiOperation(value = "Get company domain", notes = "id of the company is got from the token")
    @GetMapping("/user")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<CompanyDomainDto> getCompanyFromToken() throws CompanyNotFoundException {
        var id = TokenService.getCompanyId();
        return new AppResponse<>(companyService.getCompanyDomain(id));
    }

    @ApiOperation(value = "Create company corporate email domain name")
    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<CompanyDomainDto> updateEmailDomain(@RequestBody CompanyEmailUpdateDto dto, @PathVariable UUID id)
            throws CompanyNotFoundException {
        return new AppResponse<>(companyService.updateEmailDomain(dto, id));
    }
    
    @GetMapping("/by-subdomain")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<CompanyDomainDto> getCompanyByDomain(@RequestParam String subdomain) throws CompanyNotFoundException {
        return new AppResponse<>(companyService.getCompanyDomain(subdomain));
    }

}
