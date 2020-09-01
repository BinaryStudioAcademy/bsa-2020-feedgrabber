package com.feed_grabber.core.user.model;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.role.Role;
import com.feed_grabber.core.team.model.Team;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Indexed
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"email", "company_id"}),
        @UniqueConstraint(columnNames = {"username", "company_id"})
})
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    @ManyToMany(
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "users"
    )
    @Builder.Default
    private List<Team> teams = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    @Builder.Default
    private Role role = new Role();

    @EqualsAndHashCode.Exclude
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private UserProfile userProfile;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private UserSettings userSettings;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "company_id")
    private Company company;
}
