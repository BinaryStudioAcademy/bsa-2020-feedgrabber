package com.feed_grabber.core.registration;

import com.feed_grabber.core.exceptions.VerificationTokenExpiredException;
import com.feed_grabber.core.exceptions.VerificationTokenNotFoundException;
import com.feed_grabber.core.registration.model.VerificationToken;
import com.feed_grabber.core.user.UserRepository;
import com.feed_grabber.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class VerificationTokenService {

    @Autowired
    VerificationTokenRepository verificationTokenRepository;

    @Autowired
    UserRepository userRepository;

    public void generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        var verificationToken = new VerificationToken(token, user);
        verificationTokenRepository.save(verificationToken);

//TODO:  send request to email service
//        var dto = SendVerificationEmailDto.builder().email(user.getEmail()).url(UrlPrefix + token)
//        emailService.sendEmail(dto);
    }

    public void verifyUserByToken(String token)
            throws VerificationTokenNotFoundException, VerificationTokenExpiredException {
        VerificationToken verificationToken = verificationTokenRepository
                .findByToken(token)
                .orElseThrow(() -> new VerificationTokenNotFoundException(token));
        if (verificationToken.getExpirationDate().after(new Date())) {
            User user = verificationToken.getUser();
            user.setIsEnabled(true);
            userRepository.save(user);
        } else {
            throw new VerificationTokenExpiredException(token);
        }
    }

}
