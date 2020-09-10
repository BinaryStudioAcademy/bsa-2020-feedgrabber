package com.feed_grabber.core.company;

import com.feed_grabber.core.questionnaire.model.Questionnaire;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.lucene.analysis.core.WhitespaceAnalyzer;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.search.annotations.*;
import org.hibernate.search.annotations.Index;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Embeddable
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "companies")
public class Company {
    public Company(UUID id) {
        this.id = id;
    }

    @Id
    @Field(name = "idCopy")
    @Analyzer(impl = WhitespaceAnalyzer.class)
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Field
    @Analyzer(definition = "autocompleteEdgeAnalyzer")
    @Column
    private String name;

    @Column
    private String address;

    @Column
    private String phoneNumber;

    @Column
    private String corporateEmail;

    @IndexedEmbedded(depth = 2)
    @OneToMany(mappedBy = "company")
    private List<Questionnaire> questionnaires;

    @Column(name = "subdomain_name")
    private String subdomainName;

    @Column(name = "email_domain")
    private String emailDomain;
}
