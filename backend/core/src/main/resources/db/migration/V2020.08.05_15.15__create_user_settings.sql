create table user_settings
(
    id                   uuid    not null,
    enable_notifications boolean not null,
    language             varchar(255),
    user_id              uuid    not null references users (id),
    primary key (id)
);