package com.feed_grabber.core.search;

import com.feed_grabber.core.question.QuestionMapper;
import com.feed_grabber.core.question.dto.QuestionDto;
import com.feed_grabber.core.question.model.Question;
import com.feed_grabber.core.questionnaire.QuestionnaireMapper;
import com.feed_grabber.core.questionnaire.dto.QuestionnaireDto;
import com.feed_grabber.core.questionnaire.model.Questionnaire;
import com.feed_grabber.core.report.ReportMapper;
import com.feed_grabber.core.report.dto.ReportDetailsDto;
import com.feed_grabber.core.request.model.Request;
import com.feed_grabber.core.search.dto.PagedResponseDto;
import com.feed_grabber.core.search.dto.SearchDto;
import com.feed_grabber.core.team.TeamMapper;
import com.feed_grabber.core.team.dto.TeamDto;
import com.feed_grabber.core.team.model.Team;
import com.feed_grabber.core.user.UserMapper;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import com.feed_grabber.core.user.model.User;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.feed_grabber.core.auth.security.TokenService.getCompanyId;

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
                        .onFields(fields)
                        .matching(query)
                        .createQuery()
                , initial);
    }

    public SearchDto findAllByQuery(String query) {
        return SearchDto
                .builder()
                .users(getUsersList(query, Optional.empty(), Optional.empty()).getObjects())
                .questionnaires(getQuestionnaireList(query, Optional.empty(), Optional.empty()).getObjects())
                .questions(getQuestionsList(query, Optional.empty(), Optional.empty()).getObjects())
                .teams(getTeamList(query, Optional.empty(), Optional.empty()).getObjects())
                .reports(getReportList(query, Optional.empty(), Optional.empty()).getObjects())
                .build();
    }

    @SuppressWarnings("unchecked")
    public PagedResponseDto<UserDetailsResponseDTO> getUsersList(String query
            , Optional<Integer> page
            , Optional<Integer> size) {
        var userQuery = getFullTextQuery(
                User.class
                , query
                , "email"
                , "username"
                , "userProfile.firstName"
                , "userProfile.lastName"
                , "userProfile.phoneNumber");
        if (page.isPresent() && size.isPresent()) {
            userQuery.setMaxResults(size.get());
            userQuery.setFirstResult(page.get() * size.get());
        }
        return new PagedResponseDto<>(((List<User>) userQuery.getResultList())
                .stream()
                .filter(u -> u.getCompany().getId().equals(getCompanyId()))
                .map(UserMapper.MAPPER::detailedFromUser)
                .collect(Collectors.toList())
                , (long) userQuery.getResultSize());
    }

    @SuppressWarnings("unchecked")
    public PagedResponseDto<QuestionDto> getQuestionsList(String query
            , Optional<Integer> page
            , Optional<Integer> size) {
        var questionQuery = getFullTextQuery(
                Question.class
                , query
                , "text"
                , "category.title");
        if (page.isPresent() && size.isPresent()) {
            questionQuery.setMaxResults(size.get());
            questionQuery.setFirstResult(page.get() * size.get());
        }
        return new PagedResponseDto<>(((List<Question>) questionQuery.getResultList())
                .stream()
                .map(QuestionMapper.MAPPER::questionToQuestionDto)
                .collect(Collectors.toList())
                , (long) questionQuery.getResultSize());
    }

    @SuppressWarnings("unchecked")
    public PagedResponseDto<QuestionnaireDto> getQuestionnaireList(String query
            , Optional<Integer> page
            , Optional<Integer> size) {
        var questionnaireQuery = getFullTextQuery(
                Questionnaire.class
                , query
                , "title"
                , "company.name");
        if (page.isPresent() && size.isPresent()) {
            questionnaireQuery.setMaxResults(size.get());
            questionnaireQuery.setFirstResult(page.get() * size.get());
        }
        return new PagedResponseDto<>(((List<Questionnaire>) questionnaireQuery.getResultList())
                .stream()
                .map(QuestionnaireMapper.MAPPER::questionnaireToQuestionnaireDto)
                .collect(Collectors.toList())
                , (long) questionnaireQuery.getResultSize());
    }

    @SuppressWarnings("unchecked")
    public PagedResponseDto<ReportDetailsDto> getReportList(String query
            , Optional<Integer> page
            , Optional<Integer> size) {
        var reportQuery = getFullTextQuery(
                Request.class
                , query
                , "questionnaire.title");
        if (page.isPresent() && size.isPresent()) {
            reportQuery.setMaxResults(size.get());
            reportQuery.setFirstResult(page.get() * size.get());
        }
        return new PagedResponseDto<>(((List<Request>) reportQuery.getResultList())
                .stream()
                .map(ReportMapper.MAPPER::requestToReportDetails)
                .collect(Collectors.toList())
                , (long) reportQuery.getResultSize());
    }

    @SuppressWarnings("unchecked")
    public PagedResponseDto<TeamDto> getTeamList(String query
            , Optional<Integer> page
            , Optional<Integer> size) {
        var teamQuery = getFullTextQuery(
                Team.class
                , query
                , "name"
                , "company.name");
        if (page.isPresent() && size.isPresent()) {
            teamQuery.setMaxResults(size.get());
            teamQuery.setFirstResult(page.get() * size.get());
        }
        return new PagedResponseDto<>(((List<Team>) teamQuery.getResultList())
                .stream()
                .map(TeamMapper.MAPPER::teamToTeamDto)
                .collect(Collectors.toList())
                , (long) teamQuery.getResultSize());
    }
}
