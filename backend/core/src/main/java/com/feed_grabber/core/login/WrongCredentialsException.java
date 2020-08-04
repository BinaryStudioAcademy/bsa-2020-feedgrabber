package com.feed_grabber.core.login;

/**
 * @author Aleksandr Karpachov
 * @version 1.0
 * @since 04.08.2020
 */
public class WrongCredentialsException extends RuntimeException {
    public WrongCredentialsException(String msg) {
        super(msg);
    }
}
