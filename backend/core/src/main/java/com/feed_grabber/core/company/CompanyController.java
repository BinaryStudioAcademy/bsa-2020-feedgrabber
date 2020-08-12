package com.feed_grabber.core.company;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.company.dto.CompanyDto;
import com.feed_grabber.core.response.AppResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/company")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService userService) {
        this.companyService = userService;
    }

    @GetMapping
    public AppResponse<CompanyDto> getCompanyDetails() {
        var id = TokenService.getCompanyId();
        return new AppResponse<>(companyService.getById(id).orElseThrow(), HttpStatus.OK);
    }

}
