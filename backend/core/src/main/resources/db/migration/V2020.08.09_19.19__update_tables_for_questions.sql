create table questionnaire_question
(
    questionnaire_id uuid not null,
    question_id uuid not null,
    primary key(questionnaire_id, question_id),
    constraint fk_questionnaire2question foreign key(questionnaire_id) references questionnaires(id),
    constraint fk_question2questionnaire foreign key(question_id) references questions(id)
);

alter table questions
drop column if exists questionnaire_id,
add column type varchar(255) not null,
add column company_id uuid not null,
add foreign key (company_id) references companies (id);