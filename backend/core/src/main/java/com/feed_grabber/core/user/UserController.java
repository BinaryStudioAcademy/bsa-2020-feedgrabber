package com.feed_grabber.core.user;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.registration.TokenType;
import com.feed_grabber.core.registration.VerificationTokenService;
import com.feed_grabber.core.registration.exceptions.VerificationTokenExpiredException;
import com.feed_grabber.core.registration.exceptions.VerificationTokenNotFoundException;
import com.feed_grabber.core.role.dto.RoleAssignmentDto;
import com.feed_grabber.core.user.dto.*;

import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.apiContract.DataList;
import com.feed_grabber.core.user.dto.ResetPassDto;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import com.feed_grabber.core.user.dto.UserInfoToResetPassDto;
import com.feed_grabber.core.user.dto.UserShortDto;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


import java.util.List;

import static com.feed_grabber.core.role.RoleConstants.ROLE_COMPANY_OWNER;


@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final VerificationTokenService tokenService;

    public UserController(UserService userService, UserRepository userRepository, VerificationTokenService tokenService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    @ApiOperation(value = "Get details from one user",
            notes = "You should not to provide an id, it will be got from token service")
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<UserDetailsResponseDTO> getUserDetails() {
        var id = TokenService.getUserId();
        return new AppResponse<>(userService.getUserDetails(id).orElseThrow());
    }

    @ApiOperation(value = "Get all users",
            notes = "You should not to provide an id, it will be got from token service")
    @GetMapping("/all/list")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<List<UserShortDto>> getAllUsers() {
        var companyId = TokenService.getCompanyId();
        return new AppResponse<>(userService.getAllByCompanyId(companyId));
    }

    @ApiOperation(value = "Send an email to reset password")
    @PostMapping("/email/reset")
    public void sendEmailToResetPass(@RequestBody UserInfoToResetPassDto dto) throws UserNotFoundException {
        var user = userRepository
                .findByCompanyIdAndEmail(dto.getCompanyId(), dto.getUserEmail())
                .orElseThrow(UserNotFoundException::new);

        var token = tokenService.generateVerificationToken(user, TokenType.RESET);
    }

    @ApiOperation(value = "Update password")
    @PostMapping("/reset")
    public void resetPassword(@RequestBody ResetPassDto dto)
            throws VerificationTokenNotFoundException, VerificationTokenExpiredException {

        var user = tokenService.verifyUserByToken(dto.getToken(), TokenType.RESET);
        userService.updatePassword(user.getId(), dto.getPassword());
    }

    @ApiOperation(value = "Update role")
    @PutMapping("/role/change")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void changeRole(@RequestBody RoleAssignmentDto dto) throws NotFoundException {
        userService.changeRole(dto.getUserId(), dto.getRoleId());
    }


    @GetMapping("/all")
    public AppResponse<DataList<UserDetailsResponseDTO>> getUsersByCompanyId(
            @RequestParam Integer page,
            @RequestParam Integer size
    ) {
        var companyId = TokenService.getCompanyId();
        return new AppResponse<>(
                new DataList<>(
                        userService.getAllByCompanyId(companyId, page, size),
                        userService.getCountByCompanyId(companyId),
                        page,
                        size
                ));
    }

    @GetMapping("/search")
    public AppResponse<DataList<UserDetailsResponseDTO>> getUsersBySurname (
            @RequestParam String query,
            @RequestParam Integer page,
            @RequestParam Integer size
    ) {
        var companyId = TokenService.getCompanyId();
        return new AppResponse<>(
                new DataList<>(
                        userService.searchByQuery(companyId, query, page, size),
                        userService.getCountByQuery(companyId, query),
                        page,
                        size
                ));

    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("{id}/removeCompany")
    @Secured(value = {ROLE_COMPANY_OWNER})
    public void removeUserFromCompany (@PathVariable UUID id) {
        userService.removeCompany(id);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PostMapping("/editProfile")
    public void editProfile(@RequestBody UserProfileEditDto dto) throws NotFoundException {
        this.userService.editUserProfile(dto);
    }

    @GetMapping("/short")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<UserShortDto> getUserShortByEmailAndCompany(@RequestParam String email,
                                                                   @RequestParam UUID companyId)
            throws UserNotFoundException {
        return new AppResponse<>(userService.getUserShortByEmailAndCompany(email, companyId));
    }
}
