package com.feed_grabber.core.user;

import com.feed_grabber.core.role.RoleRepository;
import com.feed_grabber.core.team.TeamRepository;
import com.feed_grabber.core.user.dto.UserCreateDto;
import com.feed_grabber.core.user.dto.UserDto;
import com.feed_grabber.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private TeamRepository teamRepository;

    public Optional<UUID> createUser(UserCreateDto userDto) {
        try {
            var role = roleRepository.getOne(userDto.getRoleId());
            var team = teamRepository.getOne(userDto.getTeamId());
            var user = User.fromDto(userDto, role, team);
            var result = userRepository.save(user);
            return Optional.of(result.getId());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<UserDto> getUserById(UUID id) {
        return userRepository.findById(id).map(UserDto::fromEntity);
    }

    public List<UserDto> getUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
    }
}
