create table users
(
    id   uuid not null,
    email varchar(255),
    username varchar(255),
    password varchar(255),
    primary key (id)
);