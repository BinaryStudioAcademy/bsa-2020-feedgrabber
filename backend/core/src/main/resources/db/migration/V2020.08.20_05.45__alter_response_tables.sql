drop table respondents_requests;
drop table response_answer;
drop table response;

create table responses (
                           id uuid primary key,
                           user_id uuid not null,
                           request_id uuid not null,
                           payload text
);

alter table responses add foreign key (user_id) references users (id);
alter table responses add foreign key (request_id) references requests (id);

alter table requests
    alter column creation_date set data type time,
    alter column expiration_date set data type time;

alter table questions
    alter column payload set data type text
