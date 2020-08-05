create table roles
(
    id          uuid primary key,
    name        varchar(255) unique,
    description varchar(255) unique,
    company_id  uuid,
    foreign key (company_id) REFERENCES companies (id)
);