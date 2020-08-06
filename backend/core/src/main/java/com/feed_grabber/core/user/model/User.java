package com.feed_grabber.core.user.model;

import com.feed_grabber.core.role.Role;
import com.feed_grabber.core.team.Team;
import com.feed_grabber.core.user.dto.UserCreateDto;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
//@EqualsAndHashCode(callSuper = true)
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @ManyToMany(
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinColumn(name = "team_id")
    @Builder.Default
    private List<Team> teams = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    @Builder.Default
    private Role role = new Role();

    @OneToOne(cascade = CascadeType.REFRESH, mappedBy = "user")
    private UserProfile userProfile;

    @OneToOne(cascade = CascadeType.REFRESH, mappedBy = "user")
    private UserSettings userSettings;

    public static User fromDto(UserCreateDto userCreateDto) {
        return User.builder()
                .id(userCreateDto.getId())
                .email(userCreateDto.getEmail())
                .username(userCreateDto.getUsername())
                .password(userCreateDto.getPassword())
                .userProfile(new UserProfile())
                .userSettings(new UserSettings())
                .build();
    }
}
