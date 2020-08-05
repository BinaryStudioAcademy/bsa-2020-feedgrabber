create table teams
(
    id         uuid not null,
    name       varchar(255),
    company_id uuid,
    primary key (id)
);