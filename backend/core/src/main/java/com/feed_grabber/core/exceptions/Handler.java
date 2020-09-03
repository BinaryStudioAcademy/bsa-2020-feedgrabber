package com.feed_grabber.core.exceptions;

import com.feed_grabber.core.auth.exceptions.*;
import com.feed_grabber.core.registration.exceptions.VerificationTokenExpiredException;
import com.feed_grabber.core.apiContract.AppResponse;
import com.feed_grabber.core.responseDeadline.exceptions.DeadlineExpiredException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
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

    @ExceptionHandler(value = WrongCredentialsException.class)
    public ResponseEntity<AppResponse<Object>> handleUserNotFoundException(WrongCredentialsException exception) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new AppResponse<>(exception));
    }

    @ExceptionHandler(value = UserAlreadyExistsException.class)
    public ResponseEntity<AppResponse<Object>> handleUserAlreadyExistsException(UserAlreadyExistsException exception) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new AppResponse<>(exception));
    }

    @ExceptionHandler(value = JwtTokenException.class)
    public ResponseEntity<AppResponse<Object>> handleJwtExpiredException(JwtTokenException exception) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new AppResponse<>(exception));
    }

    @ExceptionHandler(value = InsertionException.class)
    public ResponseEntity<AppResponse<Object>> handleInsertionException(InsertionException exception) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new AppResponse<>(exception));
    }

    @ExceptionHandler(value = DeadlineExpiredException.class)
    public ResponseEntity<AppResponse<Object>> handleDeadlineExpired(DeadlineExpiredException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new AppResponse<>(ex));
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    public ResponseEntity<AppResponse<Object>> handleAccessDenied(AccessDeniedException ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new AppResponse<>(ex));
    }
    @ExceptionHandler(value = WrongCorporateEmailException.class)
    public ResponseEntity<AppResponse<Object>> handleWrongCorporateEmailException(WrongCorporateEmailException exception) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new AppResponse<>(exception));
    }
}
