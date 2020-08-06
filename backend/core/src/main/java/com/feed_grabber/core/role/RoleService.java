package com.feed_grabber.core.role;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.role.dto.RoleDetailsDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<RoleDetailsDto> initDefaultCompanyRoles(Company company) {
        return roleRepository.saveAll(
                List.of(Role
                                .builder()
                                .name("Company owner")
                                .systemRole(SystemRole.company_owner)
                                .description("Know your Company Owner")
                                .company(company)
                                .build()
                        , Role
                                .builder()
                                .name("HR")
                                .systemRole(SystemRole.hr)
                                .description("My possibility is to hire employees")
                                .company(company)
                                .build()
                        , Role
                                .builder()
                                .name("Employee")
                                .systemRole(SystemRole.employee)
                                .description("My possibility is to work")
                                .company(company)
                                .build())
        ).stream()
                .map(RoleDetailsDto::fromEntity)
                .collect(Collectors.toList());
    }

}
