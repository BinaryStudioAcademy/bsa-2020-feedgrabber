package com.feed_grabber.core.user;

import com.feed_grabber.core.auth.AuthService;
import com.feed_grabber.core.auth.exceptions.WrongCredentialsException;
import com.feed_grabber.core.auth.security.TokenService;
import com.feed_grabber.core.exceptions.AlreadyExistsException;
import com.feed_grabber.core.exceptions.NotFoundException;
import com.feed_grabber.core.image.ImageRepository;
import com.feed_grabber.core.image.exceptions.ImageNotFoundException;
import com.feed_grabber.core.localization.Translator;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import com.feed_grabber.core.user.dto.UserProfileEditDto;
import com.feed_grabber.core.user.dto.UserSettingsDto;
import com.feed_grabber.core.user.exceptions.UserNotFoundException;
import com.feed_grabber.core.user.model.UserProfile;
import com.feed_grabber.core.user.model.UserSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserProfileService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDetailsResponseDTO editUserProfile(UUID userId, UserProfileEditDto dto) throws NotFoundException {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("user does not exists. id=" + userId));

        if (user.getUserProfile() == null) {
            user.setUserProfile(new UserProfile(user));
        }
        var profile = user.getUserProfile();
        profile.setFirstName(dto.getFirstName());
        profile.setLastName(dto.getLastName());
        profile.setPhoneNumber(dto.getPhoneNumber());

        return UserMapper.MAPPER.detailedFromUser(userRepository.save(user));
    }


    public UserDetailsResponseDTO editUserAvatar(UUID userId, UUID imageId) throws NotFoundException {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("user does not exists. id=" + userId));
        var avatar = (imageId == null) ? null
                : imageRepository.findById(imageId).orElseThrow(ImageNotFoundException::new);

        if (user.getUserProfile() == null) {
            user.setUserProfile(new UserProfile(user));
        }
        user.getUserProfile().setAvatar(avatar);

        return UserMapper.MAPPER.detailedFromUser(userRepository.save(user));
    }

    public UserDetailsResponseDTO updateUsername(UUID userId, String userName) throws NotFoundException, AlreadyExistsException {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("user does not exists. id=" + userId));
        user.setUsername(userName);

        try {
            return UserMapper.MAPPER.detailedFromUser(userRepository.save(user));
        } catch (RuntimeException e) {
            throw new AlreadyExistsException(Translator.toLocale("user_exists"));
        }
    }

    public UserDetailsResponseDTO updatePassword(UUID userId, String oldPassword, String newPassword)
            throws UserNotFoundException {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("user does not exists. id=" + userId));

        var username = AuthService.generateUserName(user.getUsername(), TokenService.getCompanyId());
        var upa = new UsernamePasswordAuthenticationToken(username, oldPassword);

        try {
            authenticationManager.authenticate(upa);
        } catch (Exception e) {
            throw new WrongCredentialsException(Translator.toLocale("incorrect_password"));
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        return UserMapper.MAPPER.detailedFromUser(userRepository.save(user));
    }

    public UserSettingsDto getUserSettings(UUID userId) throws UserNotFoundException {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("user does not exists. id=" + userId));

        return UserMapper.MAPPER.settingsFromUser(user);
    }

    public UserSettingsDto updateUserSettings(UUID userId, UserSettingsDto dto) throws UserNotFoundException {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("user does not exists. id=" + userId));
        if (user.getUserSettings() == null) {
            user.setUserSettings(new UserSettings(user));
        }

        user.getUserSettings().setEnableNotifications(dto.getEnableNotifications());
        user.getUserSettings().setLanguage(dto.getLanguage());

        return UserMapper.MAPPER.settingsFromUser(userRepository.save(user));
    }
}
