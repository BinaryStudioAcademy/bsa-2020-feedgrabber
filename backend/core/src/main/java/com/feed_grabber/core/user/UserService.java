package com.feed_grabber.core.user;

import com.feed_grabber.core.user.dto.UserCreateDto;
import com.feed_grabber.core.user.dto.UserDto;
import com.feed_grabber.core.user.dto.UserResponseOnlyNameDTO;
import com.feed_grabber.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private RoleService roleService;

    @Transactional
    public UserResponseOnlyNameDTO createDefault(UserRegisterDTO userRegisterDTO) {
        var company = companyRepository
                .findById(
                        companyService
                                .create(CompanyDto
                                        .builder()
                                        .name(userRegisterDTO.getCompanyName())
                                        .build()
                                ).orElseThrow())
                .orElseThrow();

        var roles = roleService
                .initDefaultCompanyRoles(company)
                .stream()
                .filter(roleD -> roleD.getSystemRole().equals(SystemRole.company_owner))
                .collect(Collectors.toList());

        if (roles.size() != 1) {
            throw new RuntimeException();
        }

        var role = roleRepository.findById(roles.get(0).getId()).orElseThrow();

        return UserResponseOnlyNameDTO
                .fromEntity(userRepository
                        .findById(
                                userRepository.save(User
                                        .builder()
                                        .email(userRegisterDTO.getEmail())
                                        .username(userRegisterDTO.getUsername())
                                        .password(userRegisterDTO.getPassword())
                                        .role(role)
                                        .build()
                                ).getId()
                        ).orElseThrow()
                );
    }

    public Optional<UUID> createUser(UserCreateDto userDto) {
        try {
            var user = UserMapper.MAPPER.userCreateDtoToModel(userDto);
            var result = userRepository.save(user);
            return Optional.of(result.getId());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<UserDto> getUserById(UUID id) {
        return userRepository.findById(id).map(UserMapper.MAPPER::userToUserDto);
    }

    public List<UserDto> getUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(UserMapper.MAPPER::userToUserDto)
                .collect(Collectors.toList());
    }

    public Optional<UserDto> updateUser(UUID id, UserDto userDto) {
        var userToUpdate = userRepository.getOne(id);
        userToUpdate.setEmail(userDto.getEmail());
        userToUpdate.setPassword(userDto.getPassword());
        userToUpdate.setUsername(userDto.getUsername());
        userRepository.save(userToUpdate);
        return Optional.of(UserMapper.MAPPER.userToUserDto(userToUpdate));
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    @Override
    public org.springframework.security.core.userdetails.User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .map(u -> new org.springframework.security.core.userdetails.User(u.getUsername()
                        , u.getPassword()
                        , Collections.emptyList()))
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }
}
