package com.feed_grabber.core.login;

import com.feed_grabber.core.login.dto.LoginDto;
import com.feed_grabber.core.login.dto.LoginResponseDto;
import com.feed_grabber.core.login.model.TemporaryUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    StubService authService;
    
//    @PostMapping("/login")
//    public LoginResponseDto login(@RequestBody LoginDto dto) {
//        var user = authService.auth(dto);
//        // to do
//        // import TokenService from Auth
//        // var token = tokenService.generateToken(userId)
//        // var refreshedToken = tokenService.generateRenovationToken(userId)
//        return new LoginResponseDto(user, "token", "refrToken");
//
//    } commented because created new method in auth folder

    @ExceptionHandler(WrongCredentialsException.class)
    public ResponseEntity<String> handleUserNotFoundException(WrongCredentialsException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }


}
