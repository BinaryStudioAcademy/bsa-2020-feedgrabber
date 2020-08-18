create table sections (
    id              uuid not null,
    title           varchar(255) not null,
    description     varchar(255),
    order_number    integer default 1,
    questionnaire_id uuid not null,
    primary key(id),
    foreign key(questionnaire_id) references questionnaires(id)
);

alter table questions
add column section_id uuid,
foreign key(section_id) references sections(id);
