create table user_profiles
(
    id           uuid not null,
    first_name   varchar(255),
    last_name    varchar(255),
    phone_number varchar(255),
    user_id      uuid not null references users (id),
    primary key (id)
);
