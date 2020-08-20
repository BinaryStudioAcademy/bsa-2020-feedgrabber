create table responses (
    id uuid primary key,
    user_id uuid not null,
    request_id uuid not null,
    payload text
);

alter table responses add foreign key (user_id) references users (id);
alter table responses add foreign key (request_id) references requests (id);
