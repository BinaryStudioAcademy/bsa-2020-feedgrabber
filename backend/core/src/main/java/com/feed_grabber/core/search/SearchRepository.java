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
import org.hibernate.search.jpa.Search;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class SearchRepository {

    public SearchRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    private final EntityManager entityManager;

    public SearchDto findAllByQuery(String query) {
        var fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        var userQuery = fullTextEntityManager.createFullTextQuery(
                fullTextEntityManager
                        .getSearchFactory()
                        .buildQueryBuilder()
                        .forEntity(User.class)
                        .get()
                        .keyword()
                        .onFields("email"
                                , "username"
                                , "userProfile.firstName"
                                , "userProfile.lastName"
                                , "userProfile.phoneNumber")
                        .matching(query)
                        .createQuery()
                , User.class);

        var questionQuery = fullTextEntityManager.createFullTextQuery(
                fullTextEntityManager
                        .getSearchFactory()
                        .buildQueryBuilder()
                        .forEntity(Question.class)
                        .get()
                        .keyword()
                        .onFields("text"
                                , "payload"
                                , "category.title")
                        .matching(query)
                        .createQuery()
                , Question.class);

        var questionnaireQuery = fullTextEntityManager.createFullTextQuery(
                fullTextEntityManager
                        .getSearchFactory()
                        .buildQueryBuilder()
                        .forEntity(Questionnaire.class)
                        .get()
                        .keyword()
                        .onFields("title"
                                , "company.name")
                        .matching(query)
                        .createQuery()
                , Questionnaire.class);

        var reportQuery = fullTextEntityManager.createFullTextQuery(
                fullTextEntityManager
                        .getSearchFactory()
                        .buildQueryBuilder()
                        .forEntity(Request.class)
                        .get()
                        .keyword()
                        .onFields("questionnaire.title")
                        .matching(query)
                        .createQuery()
                , Request.class);

        var teamQuery = fullTextEntityManager.createFullTextQuery(
                fullTextEntityManager
                        .getSearchFactory()
                        .buildQueryBuilder()
                        .forEntity(Team.class)
                        .get()
                        .keyword()
                        .onFields("name"
                                , "company.name")
                        .matching(query)
                        .createQuery()
                , Team.class);

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
