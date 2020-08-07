package com.feed_grabber.core.auth;

import com.feed_grabber.core.auth.dto.*;
import com.feed_grabber.core.register.RegisterService;
import com.feed_grabber.core.response.AppResponse;
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

    @PostMapping("/renovate")
    @ResponseStatus(HttpStatus.CREATED)
    public AppResponse<TokenRefreshResponseDTO> renovate(@RequestBody TokenRefreshRequestDTO token) throws Exception {
        try {
            return new AppResponse<>(authService.refresh(token.getToken()));
        } catch (Exception ex) {
            return new AppResponse<>(ex);
        }
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppResponse<AuthUserDTO> register(@RequestBody UserRegisterDTO dto) {
        try {

            var pass = dto.getPassword();
            registerService.registerUser(dto);
            var loginDto = new UserLoginDTO(pass, dto.getUsername());
            return login(loginDto);

        } catch (Exception ex) {
            return new AppResponse<>(ex);
        }
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public AppResponse<AuthUserDTO> login(@RequestBody UserLoginDTO userLoginDTO) {
        try {
            return new AppResponse<>(authService.login(userLoginDTO));
        } catch (Exception ex) {
            return new AppResponse<>(ex);
        }
    }

}
