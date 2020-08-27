create table sections (
    id                  uuid not null,
    title               varchar(255) not null,
    description         varchar(255),
    order_index         integer default '1',
    questionnaire_id    uuid not null,
    primary key(id),
    foreign key(questionnaire_id) references questionnaires(id)
);

create table sections_questions (
    section_id uuid not null,
    question_id uuid not null,
    order_index integer,
    primary key(section_id, question_id),
    foreign key(section_id) references sections(id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key(question_id) references questions(id) ON DELETE CASCADE ON UPDATE CASCADE
)



