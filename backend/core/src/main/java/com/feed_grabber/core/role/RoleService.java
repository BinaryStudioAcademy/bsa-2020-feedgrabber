package com.feed_grabber.core.role;

import com.feed_grabber.core.role.dto.ShortRoleDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RoleService {
    private RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<ShortRoleDto> getShortRoles(UUID companyId) {
        return roleRepository.findAllByCompanyId(companyId)
                .stream()
                .map(r -> RoleMapper.MAPPER.roleToShortRole(r))
                .collect(Collectors.toList());
    }
}
