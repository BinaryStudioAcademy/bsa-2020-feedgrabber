create table news_reaction
(
    id                   uuid    not null,
    reaction             varchar(16),
    user_id              uuid    not null references users (id),
    news_id              uuid    not null references news (id),
    primary key (id)
);