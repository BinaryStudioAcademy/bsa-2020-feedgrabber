package com.feed_grabber.core.login;

import com.feed_grabber.core.login.dto.LoginDto;
import com.feed_grabber.core.login.model.TemporaryUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Aleksandr Karpachov
 * @version 1.0
 * @since 04.08.2020
 */
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    StubService authService;
    
    @PostMapping("/login")
    public TemporaryUser login(@RequestBody LoginDto dto) {
        return authService.auth(dto);
    }

    @ExceptionHandler(WrongCredentialsException.class)
    public ResponseEntity<String> handleUserNotFoundException(WrongCredentialsException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }


}
