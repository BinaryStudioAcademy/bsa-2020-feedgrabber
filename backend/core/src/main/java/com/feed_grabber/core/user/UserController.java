package com.feed_grabber.core.user;

import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.registration.TokenType;
import com.feed_grabber.core.registration.VerificationTokenService;
import com.feed_grabber.core.registration.exceptions.VerificationTokenExpiredException;
import com.feed_grabber.core.registration.exceptions.VerificationTokenNotFoundException;
import com.feed_grabber.core.response.AppResponse;
import com.feed_grabber.core.user.dto.ResetPassDto;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import com.feed_grabber.core.user.dto.UserInfoToResetPassDto;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


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

    @ApiOperation(value = "Send an email to reset password")
    @PostMapping("/email/reset")
    public void sendEmailToResetPass(@RequestBody UserInfoToResetPassDto dto) throws UserNotFoundException {
        var user = userRepository
                .findByCompanyIdAndEmail(dto.getCompanyId(), dto.getUserEmail())
                .orElseThrow(UserNotFoundException::new);

        var token = tokenService.generateVerificationToken(user, TokenType.RESET);
        // TODO: Send email with token
    }

    @ApiOperation(value = "Update password")
    @PostMapping("/reset")
    public void resetPassword(@RequestBody ResetPassDto dto)
            throws VerificationTokenNotFoundException, VerificationTokenExpiredException {

        var user = tokenService.verifyUserByToken(dto.getToken(), TokenType.RESET);
        userService.updatePassword(user.getId(), dto.getPassword());
    }


}
