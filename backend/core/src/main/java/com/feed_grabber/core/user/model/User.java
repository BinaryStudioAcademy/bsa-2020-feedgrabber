package com.feed_grabber.core.user.model;

import com.feed_grabber.core.company.Company;
import com.feed_grabber.core.role.model.Role;
import com.feed_grabber.core.team.model.Team;
import lombok.*;
import org.apache.lucene.analysis.core.LowerCaseFilterFactory;
import org.apache.lucene.analysis.core.WhitespaceAnalyzer;
import org.apache.lucene.analysis.ngram.EdgeNGramFilterFactory;
import org.apache.lucene.analysis.pattern.PatternReplaceFilterFactory;
import org.apache.lucene.analysis.standard.ClassicTokenizerFactory;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.search.annotations.*;
import org.hibernate.search.annotations.Parameter;
import org.hibernate.search.filter.ShardSensitiveOnlyFilter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Indexed
@AnalyzerDef(name = "autocompleteEdgeAnalyzer",
        tokenizer = @TokenizerDef(factory = ClassicTokenizerFactory.class),
        filters = {
                @TokenFilterDef(factory = PatternReplaceFilterFactory.class, params = {
                        @Parameter(name = "pattern", value = "([^a-zA-Z0-9\\.])"),
                        @Parameter(name = "replacement", value = " "),
                        @Parameter(name = "replace", value = "all") }),
                @TokenFilterDef(factory = LowerCaseFilterFactory.class),
                @TokenFilterDef(factory = EdgeNGramFilterFactory.class, params = {
                        @Parameter(name = "minGramSize", value = "1"),
                        @Parameter(name = "maxGramSize", value = "50") }) })
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

    @Field
    @Analyzer(definition = "autocompleteEdgeAnalyzer")
    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Field
    @Analyzer(definition = "autocompleteEdgeAnalyzer")
    @Column(name = "username", nullable = false, length = 20)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "is_enabled")
    private Boolean isEnabled;

	@Builder.Default
    @Column(name = "is_deleted")
    private Boolean isDeleted = false;

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

    @IndexedEmbedded(depth = 2)
    @EqualsAndHashCode.Exclude
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    private UserProfile userProfile;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
    @EqualsAndHashCode.Exclude
    private UserSettings userSettings;

    @IndexedEmbedded(depth = 2, includeEmbeddedObjectId = true)
    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "company_id")
    private Company company;
}
