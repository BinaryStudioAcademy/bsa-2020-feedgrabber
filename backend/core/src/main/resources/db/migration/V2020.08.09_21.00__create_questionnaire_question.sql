create table questionnaire_question
(
    questionnaire_id    uuid not null references questionnaires (id),
    question_id         uuid not null references questions (id),
    primary key(questionnaire_id, question_id)
);

INSERT INTO questionnaire_question
(questionnaire_id, question_id)
(SELECT q.id as q_id, que.id as que_id
    FROM questionnaires as q
    LEFT JOIN questions as que
    ON que.questionnaire_id = q.id);

