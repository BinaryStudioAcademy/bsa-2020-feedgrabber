create table users
(
    id       uuid not null,
    email    varchar(255) unique,
    username varchar(255) unique,
    password varchar(255),
    role_id uuid,
    primary key (id),
    foreign key (role_id) references roles (id)
);