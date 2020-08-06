package com.feed_grabber.core.exceptions;

public class VerificationTokenNotFoundException extends Exception{
    public VerificationTokenNotFoundException(String token){
        super("Verification Token Not Found. token: " + token);
    }
}
