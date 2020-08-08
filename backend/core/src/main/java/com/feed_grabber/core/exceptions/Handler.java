package com.feed_grabber.core.exceptions;

import com.feed_grabber.core.auth.exceptions.WrongCredentialsException;
import com.feed_grabber.core.registration.exceptions.VerificationTokenExpiredException;
import com.feed_grabber.core.response.AppResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class Handler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = VerificationTokenExpiredException.class)
    public ResponseEntity<AppResponse<Object>> handleVerificationTokenException(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new AppResponse<>(ex));
    }

    @ExceptionHandler(value = NotFoundException.class)
    public ResponseEntity<AppResponse<Object>> handleNotFoundException(NotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new AppResponse<>(ex));
    }

    @ExceptionHandler({AlreadyExistsException.class})
    public ResponseEntity<AppResponse<Object>> handleAlreadyExistsException(AlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new AppResponse<>(ex));
    }

    @ExceptionHandler(WrongCredentialsException.class)
    public ResponseEntity<String> handleUserNotFoundException(WrongCredentialsException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }

}
