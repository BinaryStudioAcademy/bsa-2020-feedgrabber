package com.feed_grabber.core.user;

import com.feed_grabber.core.auth.dto.UserRegisterDTO;
import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.exceptions.InsertionException;
import com.feed_grabber.core.exceptions.UserAlreadyExistsException;
import com.feed_grabber.core.role.Role;
import com.feed_grabber.core.role.RoleRepository;
import com.feed_grabber.core.role.SystemRole;
import com.feed_grabber.core.user.dto.UserCreateDto;
import com.feed_grabber.core.user.dto.UserDto;
import com.feed_grabber.core.user.model.User;
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
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CompanyRepository companyRepository;


    public UserService(UserRepository userRepository, RoleRepository roleRepository, CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.companyRepository = companyRepository;
    }

    @Transactional
    public void createDefault(UserRegisterDTO userRegisterDTO) {

        if (userRepository.findByUsername(userRegisterDTO.getUsername()).isPresent()
                || userRepository.findByEmail(userRegisterDTO.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException();
        }

        var company = companyRepository.save(
                Company.builder().name(userRegisterDTO.getCompanyName()).build());

        var roles = roleRepository.saveAll(
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
        );

        if (roles.size() != 3) {
            throw new InsertionException(roles.toString());
        }

        userRepository.save(User.builder()
                .email(userRegisterDTO.getEmail())
                .username(userRegisterDTO.getUsername())
                .password(userRegisterDTO.getPassword())
                .role(roles.get(0))
                .build()
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
