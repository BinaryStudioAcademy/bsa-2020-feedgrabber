create table questions
(
    id               uuid         not null,
    text             varchar(255) not null,
    category_id      uuid         not null references question_categories (id),
    questionnaire_id uuid         not null references questionnaires (id),
    primary key (id),
    unique (text, category_id, questionnaire_id)
);