package com.feed_grabber.core.user.model;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.role.Role;
import com.feed_grabber.core.team.model.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    @ManyToMany(
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(
            name = "users_teams",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "team_id")}
    )
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

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "company_id")
    private Company company;

}
