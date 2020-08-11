create table users
(
    id       uuid not null,
    email    varchar(255) unique,
    username varchar(255) unique,
    password varchar(255),
    primary key (id)
);
