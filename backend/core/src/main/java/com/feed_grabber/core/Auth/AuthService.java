package com.feed_grabber.core.Auth;

import com.feed_grabber.core.Auth.dto.UserRegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// TODO: merge to branches with user CRUD and Token authorization
@Service
public class AuthService {
//    @Autowired
//    UserService userService;
//
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder bCryptPasswordEncoder;

    public void register(UserRegisterDto userRegisterDto) {
//         var user = UserMapper.MAPPER.userRegisterDtoToUser(userRegisterDto);
//        var loginDTO = new UserLoginDTO(user.getEmail(), user.getPassword());
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//        userService.save(user);
//        return login(loginDTO);
    }
}
