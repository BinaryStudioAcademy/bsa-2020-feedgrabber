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
import com.feed_grabber.core.team.dto.TeamShortDto;
import com.feed_grabber.core.team.model.Team;
import com.feed_grabber.core.user.UserMapper;
import com.feed_grabber.core.user.dto.UserDetailsResponseDTO;
import com.feed_grabber.core.user.model.User;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.feed_grabber.core.auth.security.TokenService.getCompanyId;
import static com.feed_grabber.core.auth.security.TokenService.getUserId;
import static org.hibernate.search.annotations.IndexedEmbedded.DEFAULT_NULL_TOKEN;

@Repository
public class SearchRepository {
    private final EntityManager entityManager;

    public SearchRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    private FullTextQuery getFullTextQuery(Class<?> initial, Map<String, String[]> map, Map<String, String[]> notSearch) {
        var fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        var qb = fullTextEntityManager
                .getSearchFactory()
                .buildQueryBuilder()
                .forEntity(initial)
                .get();
        var bj = fullTextEntityManager
                .getSearchFactory()
                .buildQueryBuilder()
                .forEntity(initial)
                .get()
                .bool();

        map.forEach((k, v) -> bj.must(qb.keyword().onFields(v).matching(k).createQuery()));
        notSearch.forEach((k, v) -> bj.must(qb.keyword().onFields(v).matching(k).createQuery()).not());

        var q = bj.createQuery();

        return fullTextEntityManager.createFullTextQuery(q, initial);
    }

    public SearchDto findAllByQuery(String query) {
        return SearchDto
                .builder()
                .users(getUsersList(query, Optional.empty(), Optional.empty()).getObjects())
                .questionnaires(getQuestionnaireList(query, Optional.empty(), Optional.empty()).getObjects())
                .questions(getQuestionsList(query, Optional.empty(), Optional.empty(), Optional.empty()).getObjects())
                .teams(getTeamList(query, Optional.empty(), Optional.empty(), Optional.empty()).getObjects())
                .reports(getReportList(query, Optional.empty(), Optional.empty()).getObjects())
                .build();
    }

    @SuppressWarnings("unchecked")
    public PagedResponseDto<UserDetailsResponseDTO> getUsersList(String query
            , Optional<Integer> page
            , Optional<Integer> size) {

        var userQuery = getFullTextQuery(
                User.class
                , Map.of(query
                        , new String[]{"email"
                                , "username"
                                , "userProfile.firstName"
                                , "userProfile.lastName"
                                , "userProfile.phoneNumber"}
                        , getCompanyId().toString()
                        , new String[]{"company.id"})
                , Map.of());

        if (page.isPresent() && size.isPresent()) {
            userQuery.setMaxResults(size.get());
            userQuery.setFirstResult(page.get() * size.get());
        }

        return new PagedResponseDto<>(((List<User>) userQuery.getResultList())
                .stream()
                .map(UserMapper.MAPPER::detailedFromUser)
                .collect(Collectors.toList())
                , (long) userQuery.getResultSize());
    }

    @SuppressWarnings("unchecked")
    public PagedResponseDto<QuestionDto> getQuestionsList(String query
            , Optional<Integer> page
            , Optional<Integer> size
            , Optional<UUID> questionnaireId) {
        var questionQuery = getFullTextQuery(
                Question.class
                , Map.of(query
                        , new String[]{"text"
                                , "category.title"}
                        , getCompanyId().toString()
                        , new String[]{"company.id"})
        ,Map.of());

        if (questionnaireId.isEmpty()) {
            questionQuery.setMaxResults(size.orElse(1000));
            questionQuery.setFirstResult(page.orElse(0) * size.orElse(5));

            return new PagedResponseDto<>(((List<Question>) questionQuery.getResultList())
                    .stream()
                    .filter(q -> q.getCompany().getId().equals(getCompanyId()))
                    .map(QuestionMapper.MAPPER::questionToQuestionDto)
                    .collect(Collectors.toList())
                    , (long) questionQuery.getResultSize());
        } else {
            var questionsRaw = (List<Question>) questionQuery.getResultList();
            questionsRaw = questionsRaw.stream()
                    .filter(q -> q.getSections().stream().noneMatch(s -> s.getSection().getQuestionnaire().getId().equals(questionnaireId.get())))
                    .collect(Collectors.toList());
            var questions = questionsRaw.stream().skip(page.orElse(0) * size.orElse(5)).limit(size.orElse(1000)).collect(Collectors.toList());
            return new PagedResponseDto<>(questions
                    .stream()
                    .filter(q -> q.getCompany().getId().equals(getCompanyId()))
                    .map(QuestionMapper.MAPPER::questionToQuestionDto)
                    .collect(Collectors.toList())
                    , (long) questionsRaw.size());
        }
    }

    @SuppressWarnings("unchecked")
    public PagedResponseDto<QuestionnaireDto> getQuestionnaireList(String query
            , Optional<Integer> page
            , Optional<Integer> size) {
        var questionnaireQuery = getFullTextQuery(
                Questionnaire.class
                , Map.of(query
                        , new String[]{"title"
                                , "company.name"}
                        , getCompanyId().toString()
                        , new String[]{"company.id"})
                , Map.of());
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
                , Map.of(query
                        , new String[]{"questionnaire.title"}
                        , getUserId().toString()
                        , new String[]{"targetUser.id"})
                , Map.of());
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
    public PagedResponseDto<TeamShortDto> getTeamList(String query
            , Optional<Integer> page
            , Optional<Integer> size
            , Optional<Boolean> notBlankTeam) {

        var shouldntSearch = notBlankTeam.isPresent()
                ? Map.of(DEFAULT_NULL_TOKEN, new String[]{"users"})
                : new HashMap();

        var teamQuery = getFullTextQuery(
                Team.class
                , Map.of(query
                        , new String[]{"name"
                                , "company.name"}
                        , getCompanyId().toString()
                        , new String[]{"company.id"})
                , shouldntSearch);

        if (page.isPresent() && size.isPresent()) {
            teamQuery.setMaxResults(size.get());
            teamQuery.setFirstResult(page.get() * size.get());
        }

        var temp = ((List<Team>) teamQuery.getResultList())
                .stream()
                .map(TeamMapper.MAPPER::teamToTeamShort);
        if (notBlankTeam.isPresent()){
            temp = temp.filter(t -> t.getMembersAmount() != 0);
        }// a bit shitty, indexNullAs not working :(

        var result = temp.collect(Collectors.toList());
        return new PagedResponseDto<>(result
                , (long) result.size());
    }
}
