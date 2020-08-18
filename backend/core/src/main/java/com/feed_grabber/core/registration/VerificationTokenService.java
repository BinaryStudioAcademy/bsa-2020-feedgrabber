package com.feed_grabber.core.registration;

import com.feed_grabber.core.rabbit.Sender;
import com.feed_grabber.core.registration.exceptions.VerificationTokenExpiredException;
import com.feed_grabber.core.registration.exceptions.VerificationTokenNotFoundException;
import com.feed_grabber.core.registration.model.VerificationToken;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class VerificationTokenService {
    private final VerificationTokenRepository verificationTokenRepository;
    private final UserRepository userRepository;
    private final Sender emailSender;

    public VerificationTokenService(VerificationTokenRepository verificationTokenRepository,
                                    UserRepository userRepository,
                                    Sender emailSender) {
        this.verificationTokenRepository = verificationTokenRepository;
        this.userRepository = userRepository;
        this.emailSender = emailSender;
    }

    public String generateVerificationToken(User user, TokenType type) {
        String token = UUID.randomUUID().toString();
        var verificationToken = new VerificationToken(token, user, type);

        var verificationTokenStr = verificationTokenRepository.save(verificationToken).getToken();
        emailSender.sendToProcessor("localhost:3000/token/" + type +"/" + verificationTokenStr,
                user.getEmail(),
                type.toString());
        return verificationTokenStr;
    }

    public User verifyUserByToken(String token, TokenType type)
            throws VerificationTokenNotFoundException, VerificationTokenExpiredException {

        var vToken = verificationTokenRepository
                .findByTokenAndType(token, type)
                .orElseThrow(() -> new VerificationTokenNotFoundException(token));

        if (vToken.isExpired()) {
            throw new VerificationTokenExpiredException(token);
        }

        User user = vToken.getUser();
        user.setIsEnabled(true);

        verificationTokenRepository.delete(vToken);
        return userRepository.save(user);
    }

}
