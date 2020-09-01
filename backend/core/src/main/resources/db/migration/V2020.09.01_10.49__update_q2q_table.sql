drop table if exists question_questionnaire;
create table question_questionnaire
(
    questionnaire_id uuid not null,
    question_id uuid not null,
    primary key(question_id, questionnaire_id),
    constraint fk_questionnaire2question foreign key(questionnaire_id) references questionnaires(id),
    constraint fk_question2questionnaire foreign key(question_id) references questions(id) ON DELETE CASCADE
);