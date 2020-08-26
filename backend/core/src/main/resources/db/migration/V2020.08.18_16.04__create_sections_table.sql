create table sections (
    id                  uuid not null,
    title               varchar(255) not null,
    description         varchar(255),
    order_number        integer default '1',
    questionnaire_id    uuid not null,
    from_question_index integer,
    to_question_index   integer,
    primary key(id),
    foreign key(questionnaire_id) references questionnaires(id)
);

create table sections_questions (
    section_id uuid not null,
    question_id uuid not null,
    primary key(section_id, question_id),
    foreign key(section_id) references sections(id),
    foreign key(question_id) references questions(id)
)


