package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.*;
import com.feed_grabber.core.register.RegisterService;
import com.feed_grabber.core.response.AppResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final RegisterService registerService;

    public AuthController(AuthService authService, RegisterService registerService) {
        this.authService = authService;
        this.registerService = registerService;
    }

    @ApiOperation(value = "Renovate the token", notes = "Provide a token to renovate it")
    @PostMapping("/renovate")
    @ResponseStatus(HttpStatus.CREATED)
    public AppResponse<TokenRefreshResponseDTO> renovate(@ApiParam(value = "Token to renovate",
            required = true) @RequestBody String token) {
        return new AppResponse<>(authService.refresh(token));
    }

    @ApiOperation(value = "Register new user", notes = "Provide an email, username, companyName and password to register")
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppResponse<AuthUserResponseDTO> register(@RequestBody UserRegisterDTO dto) {
        var pass = dto.getPassword();
        registerService.registerUser(dto);

        var loginDto = new UserLoginDTO(pass, dto.getUsername());
        return login(loginDto);
    }

    @ApiOperation(value = "Login", notes = "Provide a username and password to login")
    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<AuthUserResponseDTO> login(@RequestBody UserLoginDTO userLoginDTO) {
        return new AppResponse<>(authService.login(userLoginDTO));

    }

}