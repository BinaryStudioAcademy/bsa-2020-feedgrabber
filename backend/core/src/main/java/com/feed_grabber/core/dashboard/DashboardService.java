package com.feed_grabber.core.dashboard;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.dashboard.dto.UsersInfo;
import com.feed_grabber.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.feed_grabber.core.role.RoleConstants.*;

@Service
public class DashboardService {

    @Autowired
    UserRepository userRepository;

    public UsersInfo getUsersInfo() {
        var companyId = TokenService.getCompanyId();
        var hrCount = userRepository.countAllByRoleNameAndCompanyId(ROLE_HR, companyId);
        var ownerCount = userRepository.countAllByRoleNameAndCompanyId(ROLE_COMPANY_OWNER, companyId);
        var employeeCount = userRepository.countAllByRoleNameAndCompanyId(ROLE_EMPLOYEE, companyId);
        var allCount = hrCount + employeeCount + ownerCount;
        return new UsersInfo(
            allCount, ownerCount, hrCount, employeeCount
        );
    }
}
