package com.feed_grabber.core.user;

import com.feed_grabber.core.auth.dto.UserRegisterDTO;
import com.feed_grabber.core.auth.exceptions.InsertionException;
import com.feed_grabber.core.auth.exceptions.UserAlreadyExistsException;
import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.questionnaire.QuestionnaireMapper;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.role.Role;
import com.feed_grabber.core.role.RoleRepository;
import com.feed_grabber.core.role.SystemRole;
import com.feed_grabber.core.user.dto.UserCreateDto;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import com.feed_grabber.core.user.dto.UserDto;
import com.feed_grabber.core.user.model.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, CompanyRepository companyRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
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
                .company(company)
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
        userToUpdate.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userToUpdate.setUsername(userDto.getUsername());

        return Optional.of(UserMapper.MAPPER
                .userToUserDto(userRepository.save(userToUpdate)));
    }

    public Optional<UserDto> updatePassword(UUID id, String password) {
        var userToUpdate = userRepository.getOne(id);
        userToUpdate.setPassword(passwordEncoder.encode(password));

        return Optional.of(UserMapper.MAPPER
                .userToUserDto(userRepository.save(userToUpdate)));
    }

    public void removeCompany(UUID id) {
        var userToUpdate = userRepository.getOne(id);
        userToUpdate.setCompany(null);
        userRepository.save(userToUpdate);
    }

    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    public Optional<UserDetailsResponseDTO> getUserDetails(UUID id) {
        return userRepository.findById(id).map(UserMapper.MAPPER::detailedFromUser);
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


    public List<UserDetailsResponseDTO> getAllByCompanyId(UUID companyId) {
        return userRepository.findAllByCompanyId(companyId).stream().map(UserMapper.MAPPER::detailedFromUser).collect(Collectors.toList());
    }

    public List<UserDetailsResponseDTO> getAllByCompanyId(UUID companyId, Integer page, Integer size) {
        return userRepository.findAllByCompanyId(companyId, PageRequest.of(page, size))
                .stream()
                .map(UserMapper.MAPPER::detailedFromUser)
                .collect(Collectors.toList());
    }

    public Long getCountByCompanyId(UUID companyId) {
        return userRepository.countAllByCompanyId(companyId);
    }


}
