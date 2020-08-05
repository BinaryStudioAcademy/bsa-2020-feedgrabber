package com.feed_grabber.core.role;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RoleMapper {
    RoleMapper MAPPER = Mappers.getMapper(RoleMapper.class);

    Role roleDtoToModel(RoleDto roleDto);

    RoleDto roleToRoleDto(Role role);
}
