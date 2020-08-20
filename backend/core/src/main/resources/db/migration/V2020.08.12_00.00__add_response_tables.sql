
create table response (
    id uuid primary key,
    request_id uuid,
    respondent_id uuid not null
);

alter table response add foreign key (respondent_id) references users (id);

create table response_answer (
    id uuid primary key,
    text text not null,
    response_id uuid not null,
    question_id uuid not null
);

alter table response_answer add foreign key (response_id) references response (id);
alter table response_answer add foreign key (question_id) references questions (id);
