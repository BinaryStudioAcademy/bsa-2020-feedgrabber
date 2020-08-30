alter table sections
drop column questionnaire_id,
add column questionnaire_id uuid not null,
add foreign key(questionnaire_id) references questionnaires(id) on delete cascade;

alter table user_notifications
drop column request_id,
add column request_id uuid not null,
add foreign key (request_id) references requests(id) on delete cascade;

drop table if exists responses;

create table responses (
                           id uuid primary key,
                           user_id uuid not null,
                           request_id uuid,
                           payload text,
                           answered_at timestamp,
                           notification_exists boolean not null default false
);

alter table responses add foreign key (user_id) references users (id);
alter table responses add foreign key (request_id) references requests (id) on delete set null;



