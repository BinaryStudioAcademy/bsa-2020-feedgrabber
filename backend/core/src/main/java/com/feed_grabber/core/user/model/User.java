package com.feed_grabber.core.user.model;

import com.feed_grabber.core.role.Role;
import com.feed_grabber.core.team.Team;
import com.feed_grabber.core.user.dto.UserCreateDto;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

//TODO: Add multiple teams (manytomany relations)
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

//    @ManyToMany(
//            cascade = {
//                    CascadeType.PERSIST,
//                    CascadeType.MERGE
//            })
//
//    @JoinColumn(name = "team_id")
//    private Set<Team> teamSet = new HashSet<>();
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    private Role role;

    public static User fromDto(UserCreateDto user, Role role, Team team) {
        return User.builder()
                .email(user.getEmail())
                .password(user.getPassword())
                .username(user.getUsername())
                .role(role)
                .team(team)
                .build();
    }
}
