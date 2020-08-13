package com.feed_grabber.core.exceptions;

import com.feed_grabber.core.auth.exceptions.InsertionException;
import com.feed_grabber.core.auth.exceptions.JwtTokenException;
import com.feed_grabber.core.auth.exceptions.UserAlreadyExistsException;
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
                .body(new AppResponse<>(ex, HttpStatus.FORBIDDEN));
    }

    @ExceptionHandler(value = NotFoundException.class)
    public ResponseEntity<AppResponse<Object>> handleNotFoundException(NotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new AppResponse<>(ex, HttpStatus.NOT_FOUND));
    }

    @ExceptionHandler({AlreadyExistsException.class})
    public ResponseEntity<AppResponse<Object>> handleAlreadyExistsException(AlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new AppResponse<>(ex, HttpStatus.BAD_REQUEST));
    }

    @ExceptionHandler(value = WrongCredentialsException.class)
    public ResponseEntity<AppResponse<Object>> handleUserNotFoundException(WrongCredentialsException exception) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new AppResponse<>(exception, HttpStatus.NOT_FOUND));
    }

    @ExceptionHandler(value = UserAlreadyExistsException.class)
    public ResponseEntity<AppResponse<Object>> handleUserAlreadyExistsException(UserAlreadyExistsException exception) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new AppResponse<>(exception, HttpStatus.BAD_REQUEST));
    }

    @ExceptionHandler(value = JwtTokenException.class)
    public ResponseEntity<AppResponse<Object>> handleJwtExpiredException(JwtTokenException exception) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new AppResponse<>(exception, HttpStatus.FORBIDDEN));
    }

    @ExceptionHandler(value = InsertionException.class)
    public ResponseEntity<AppResponse<Object>> handleInsertDefaultUserException(InsertionException exception) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new AppResponse<>(exception, HttpStatus.BAD_REQUEST));
    }

    @ExceptionHandler(value = InsertionException.class)
    public ResponseEntity<AppResponse<Object>> handleQuestionTypeNotExistsException(InsertionException exception) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new AppResponse<>(exception, HttpStatus.BAD_REQUEST));
    }

}
