create table teams
(
    id         uuid not null,
    name       varchar(255) not null unique ,
    company_id uuid,
    primary key (id)
);