package com.feed_grabber.core.role;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.role.dto.ShortRoleDto;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    private RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @ApiOperation(value = "Get roles from company (id is got from token)")
    @GetMapping
    public AppResponse<List<ShortRoleDto>> getShortRoles() {
        return new AppResponse<>(roleService.getShortRoles(TokenService.getCompanyId()));
    }
}

