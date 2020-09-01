package com.feed_grabber.core.search;

import com.feed_grabber.core.question.QuestionMapper;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionnaire.QuestionnaireMapper;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.report.ReportMapper;
import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.search.dto.SearchDto;
import com.feed_grabber.core.team.TeamMapper;
import com.feed_grabber.core.team.model.Team;
import com.feed_grabber.core.user.UserMapper;
import com.feed_grabber.core.user.model.User;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class SearchRepository {
    private final EntityManager entityManager;

    public SearchRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    private FullTextQuery getFullTextQuery(Class<?> initial, String query, String... fields) {
        var fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        return fullTextEntityManager.createFullTextQuery(
                fullTextEntityManager
                        .getSearchFactory()
                        .buildQueryBuilder()
                        .forEntity(initial)
                        .get()
                        .keyword()
                        .fuzzy()
                        .withEditDistanceUpTo(2)
                        .withPrefixLength(0)
                        .onFields(fields)
                        .matching(query)
                        .createQuery()
                , initial);
    }

    @SuppressWarnings("unchecked")
    public SearchDto findAllByQuery(String query) {
        var userQuery = getFullTextQuery(
                User.class
                , query
                , "email"
                , "username"
                , "userProfile.firstName"
                , "userProfile.lastName"
                , "userProfile.phoneNumber");

        var questionQuery = getFullTextQuery(
                Question.class
                , query
                , "text"
                , "category.title");

        var questionnaireQuery = getFullTextQuery(
                Questionnaire.class
                , query
                , "title"
                , "company.name");

        var reportQuery = getFullTextQuery(
                Request.class
                , query
                , "questionnaire.title");

        var teamQuery = getFullTextQuery(
                Team.class
                , query
                , "name"
                , "company.name");

        return SearchDto
                .builder()
                .users(((List<User>) userQuery.getResultList())
                        .stream()
                        .map(UserMapper.MAPPER::userToUserDto)
                        .collect(Collectors.toList()))
                .questionnaires(((List<Questionnaire>) questionnaireQuery.getResultList())
                        .stream()
                        .map(QuestionnaireMapper.MAPPER::questionnaireToQuestionnaireDto)
                        .collect(Collectors.toList()))
                .questions(((List<Question>) questionQuery.getResultList())
                        .stream()
                        .map(QuestionMapper.MAPPER::questionToQuestionDto)
                        .collect(Collectors.toList()))
                .teams(((List<Team>) teamQuery.getResultList())
                        .stream()
                        .map(TeamMapper.MAPPER::teamToTeamDto)
                        .collect(Collectors.toList()))
                .reports(((List<Request>) reportQuery.getResultList())
                        .stream()
                        .map(ReportMapper.MAPPER::requestToReportDetails)
                        .collect(Collectors.toList()))
                .build();

    }
}
