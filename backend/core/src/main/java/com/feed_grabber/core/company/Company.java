package com.feed_grabber.core.company;

import com.feed_grabber.core.questionnaire.model.Questionnaire;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.search.annotations.*;
import org.hibernate.search.annotations.Index;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

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
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Field(termVector = TermVector.YES)
    @Column
    private String name;

    @Column
    private String address;

    @Column
    private String phoneNumber;

    @Column
    private String corporateEmail;

    @OneToMany(mappedBy = "company")
    private List<Questionnaire> questionnaires;

    @Column(name = "subdomain_name")
    private String subdomainName;
}
