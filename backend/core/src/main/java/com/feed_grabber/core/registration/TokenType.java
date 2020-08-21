package com.feed_grabber.core.registration;

public enum TokenType {
    REGISTER, RESET;
    public static String tokenTypeToUrl(TokenType type) {
        switch (type) {
            case RESET:
                return "reset/";
			case REGISTER:
                return "verify-registration/";
            default:
                return "/";
        }
    };
}
