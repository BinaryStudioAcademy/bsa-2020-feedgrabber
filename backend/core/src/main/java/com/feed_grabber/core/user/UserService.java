package com.feed_grabber.core.user;

import com.feed_grabber.core.auth.AuthService;
import com.feed_grabber.core.auth.dto.UserRegisterDTO;
import com.feed_grabber.core.auth.dto.UserRegisterInvitationDTO;
import com.feed_grabber.core.auth.exceptions.InsertionException;
import com.feed_grabber.core.auth.exceptions.InvitationExpiredException;
import com.feed_grabber.core.auth.exceptions.UserAlreadyExistsException;
import com.feed_grabber.core.auth.exceptions.WrongCorporateEmailException;
import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.company.CompanyRepository;
import com.feed_grabber.core.company.exceptions.CompanyAlreadyExistsException;
import com.feed_grabber.core.company.exceptions.CompanyNotFoundException;
import com.feed_grabber.core.company.exceptions.WrongCompanyNameException;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.invitation.InvitationRepository;
import com.feed_grabber.core.invitation.InvitationService;
import com.feed_grabber.core.invitation.exceptions.InvitationNotFoundException;
import com.feed_grabber.core.registration.TokenType;
import com.feed_grabber.core.registration.VerificationTokenService;
import com.feed_grabber.core.role.model.Role;
import com.feed_grabber.core.role.RoleRepository;
import com.feed_grabber.core.role.SystemRole;
import com.feed_grabber.core.search.SearchRepository;
import com.feed_grabber.core.search.dto.PagedResponseDto;
import com.feed_grabber.core.user.dto.*;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import com.feed_grabber.core.user.model.User;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;
import java.util.stream.Collectors;

import static java.lang.Math.abs;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final CompanyRepository companyRepository;
    private final InvitationRepository invitationRepository;
    private final InvitationService invitationService;
    private final SearchRepository searchRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final VerificationTokenService verificationTokenService;
    private static final Random random = new Random();
    private static final Long RANDOM_MAX = 36L * 36L * 36L * 36L * 36L * 36L;

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       CompanyRepository companyRepository,
                       InvitationRepository invitationRepository,
                       InvitationService invitationService,
                       SearchRepository searchRepository,
                       VerificationTokenService verificationTokenService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.companyRepository = companyRepository;
        this.invitationRepository = invitationRepository;
        this.invitationService = invitationService;
        this.searchRepository = searchRepository;
        this.verificationTokenService = verificationTokenService;
    }

    @Transactional
    public UUID createDefault(UserRegisterDTO userRegisterDTO) throws WrongCompanyNameException, CompanyAlreadyExistsException {

//        if (userRepository.findByUsername(userRegisterDTO.getUsername()).isPresent()
//                || userRepository.findByEmail(userRegisterDTO.getEmail()).isPresent()) {
//            throw new UserAlreadyExistsException();
//        }

        if (companyRepository.existsByName(userRegisterDTO.getCompanyName())) {
            throw new CompanyAlreadyExistsException();
        }
        if (userRegisterDTO.getCompanyName().length() > 56) {
            throw new WrongCompanyNameException("Too long company name(more than 63)");
        }
        if (!userRegisterDTO.getCompanyName()
                .matches("([a-zA-Z0-9])([ ]?[a-zA-Z0-9])*([a-zA-Z0-9])")) {
            throw new WrongCompanyNameException("Company name should not start/end with space," +
                    " have more than one space in sequence. Company name should contain latin letters and numbers ");
        }


        String domain = generateRandomDomainFromCompanyName(userRegisterDTO.getCompanyName());

        var company = companyRepository.save(
                Company.builder()
                        .name(userRegisterDTO.getCompanyName())
                        .subdomainName(domain)
                        .build());

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

        var user = userRepository.save(User.builder()
                .email(userRegisterDTO.getEmail())
                .username(userRegisterDTO.getUsername())
                .password(userRegisterDTO.getPassword())
                .isEnabled(false)
                .role(roles.get(0))
                .company(company)
                .build()
        );
        verificationTokenService.generateVerificationToken(user, TokenType.REGISTER);
        return company.getId();
    }

    public UUID createInCompany(UserRegisterInvitationDTO registerDto) throws InvitationNotFoundException, InvitationExpiredException {

        var invitation = invitationRepository.findById(registerDto.getInvitationId())
                .orElseThrow(InvitationNotFoundException::new);
        if (invitationService.isExpired(invitation)) {
            throw new InvitationExpiredException();
        }

        var company = invitation.getCompany();
        var email = invitation.getEmail();

        var existing = userRepository.findByUsernameAndCompanyIdOrEmailAndCompanyId(
                registerDto.getUsername(), company.getId(), email, company.getId()
        );
        if (existing.isPresent()) {
            throw new UserAlreadyExistsException();
        }

        var role = roleRepository.findByCompanyIdAndSystemRole(company.getId(), SystemRole.employee)
                .orElseThrow();

        var user = userRepository.save(User.builder()
                .email(email)
                .username(registerDto.getUsername())
                .password(registerDto.getPassword())
                .isEnabled(true)
                .role(role)
                .company(company)
                .build()
        );
        invitationRepository.acceptById(registerDto.getInvitationId());
        return invitation.getCompany().getId();
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
    public org.springframework.security.core.userdetails.User loadUserByUsername(String usernameAndCompanyId)
            throws UsernameNotFoundException {
        var username = this.extractUserName(usernameAndCompanyId);
        var companyId = this.extractCompanyId(usernameAndCompanyId);
        return userRepository
                .findByUsernameAndCompanyId(username, companyId)
                .map(u ->
                        new org.springframework.security.core.userdetails.User(
                                u.getUsername(),
                                u.getPassword(),
                                u.getIsEnabled(),
                                true,
                                true,
                                true,
                                List.of(new SimpleGrantedAuthority(u.getRole().getSystemRole().toString()))
                        ))
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    private String extractUserName(String usernameAndCompanyId) {
        var index = this.getDividerIndex(usernameAndCompanyId);
        return usernameAndCompanyId.substring(0, index);
    }

    private UUID extractCompanyId(String usernameAndCompanyId) {
        var startIndex = this.getDividerIndex(usernameAndCompanyId) + 1;
        var companyId = usernameAndCompanyId.substring(startIndex, usernameAndCompanyId.length());
        return UUID.fromString(companyId);
    }

    private int getDividerIndex(String usernameAndCompanyId) {
        return usernameAndCompanyId.indexOf(AuthService.LOGIN_DIVIDER);
    }

    public List<UserShortDto> getAllByCompanyId(UUID companyId) {
        return userRepository.findAllByCompanyId(companyId)
                .stream()
                .map(UserMapper.MAPPER::shortFromUser)
                .collect(Collectors.toList());
    }

    public List<UserDetailsResponseDTO> getAllByCompanyId(UUID companyId, Integer page, Integer size) {
        return userRepository.findAllByCompanyId(companyId, PageRequest.of(page, size))
                .stream()
                .map(UserMapper.MAPPER::detailedFromUser)
                .collect(Collectors.toList());
    }

    public PagedResponseDto<UserDetailsResponseDTO> searchByQuery(String query, Integer page, Integer size){
        return searchRepository.getUsersList(query, Optional.of(page), Optional.of(size));
    }

//    public List<UserDetailsResponseDTO> searchByQuery(
//            UUID companyId,
//            String query,
//            Integer page,
//            Integer size) {
//        var parts = query.split(" ");
//        var pageable = PageRequest.of(page, size);
//        var users = parts.length == 1
//                ? userRepository.findByLastNameBeginAndCompanyId(
//                        companyId,
//                        query.toLowerCase() + "%",
//                        pageable)
//                : userRepository.findByNameAndLastNameAndCompanyId(
//                        companyId,
//                        parts[1].toLowerCase() + "%",
//                        parts[0].toLowerCase(),
//                        pageable);
//        return users.stream()
//                .map(UserMapper.MAPPER::detailedFromUser)
//                .collect(Collectors.toList());
//    }

    public Long getCountByCompanyId(UUID companyId) {
        return userRepository.countAllByCompanyId(companyId);
    }

//    public Long getCountByQuery(UUID companyId, String query) {
//        var parts = query.split(" ");
//        return parts.length == 1
//                ? userRepository.countByNameBeginAndCompanyId(companyId, parts[0].toLowerCase() + "%")
//                : userRepository.countByLastNameAndNameAndCompanyId(
//                        companyId, parts[1].toLowerCase() + "%", parts[0].toLowerCase());
//    }

//    @Transactional
//    public void editUserProfile(UserProfileEditDto dto) throws NotFoundException {
//        var user = userRepository.findById(dto.getUserId())
//                .orElseThrow(() -> new UsernameNotFoundException("user does not exists. id=" + dto.getUserId()));
//        if (user.getUserProfile() == null) {
//            var savedProfile = profileRepository.save(new UserProfile(user));
//            user.setUserProfile(savedProfile);
//        }
//        var profile = user.getUserProfile();
//        var avatar = imageRepository.findByLink(dto.getAvatar()).orElseThrow(NotFoundException::new);
//        profile.setAvatar(avatar);
//        profile.setFirstName(dto.getFirstName());
//        profile.setLastName(dto.getLastName());
//        profile.setPhoneNumber(dto.getPhoneNumber());
//        user.setUsername(dto.getUserName());
//        userRepository.save(user);
//    }

    public UserShortDto getUserShortByEmailAndCompany(String email, UUID companyId) throws UserNotFoundException {
        return UserMapper.MAPPER.shortFromUser(
                userRepository
                        .findByCompanyIdAndEmail(companyId, email)
                        .orElseThrow(UserNotFoundException::new));
    }

    private String generateRandomDomainFromCompanyName(String companyName) {
        var name = companyName.toLowerCase().replaceAll("([ ])", "-");
        var namepart = Long.toString(abs(random.nextLong()) % RANDOM_MAX, 36);


        return name + "-" + namepart;
    }

    public void changeRole(UUID userId, UUID roleId) throws NotFoundException {
        var newRole = roleRepository.findById(roleId).orElseThrow(NotFoundException::new);
        var user = userRepository.findById(userId).orElseThrow(NotFoundException::new);
        user.setRole(newRole);
        userRepository.save(user);
        verificationTokenService.deleteByUserId(userId);
    }

    // move to helper service
    private String getSubdomain(String email) {
        return email.split("@")[1];
    }

    public UUID createInCompanyByEmail(UserRegisterDTO registerDto)
            throws CompanyNotFoundException, WrongCorporateEmailException {
        var company = companyRepository
                .findCompanyByName(registerDto.getCompanyName())
                .orElseThrow(CompanyNotFoundException::new);
        if (!getSubdomain(registerDto.getEmail()).equals(company.getEmailDomain())) {
            throw new WrongCorporateEmailException();
        }
        var existing = userRepository.findByUsernameAndCompanyIdOrEmailAndCompanyId(
                registerDto.getUsername(), company.getId(), registerDto.getEmail(), company.getId()
        );
        if (existing.isPresent()) {
            throw new UserAlreadyExistsException();
        }
        var role = roleRepository.findByCompanyIdAndSystemRole(company.getId(), SystemRole.employee)
                .orElseThrow();
        var user = userRepository.save(User.builder()
                .email(registerDto.getEmail())
                .username(registerDto.getUsername())
                .password(registerDto.getPassword())
                .role(role)
                .company(company)
                .build()
        );

        return company.getId();
    }
}

