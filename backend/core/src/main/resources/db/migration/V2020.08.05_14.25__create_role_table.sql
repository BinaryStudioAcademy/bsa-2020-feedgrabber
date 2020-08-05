create table roles
(
    id          uuid primary key,
    name        varchar(255),
    description varchar(255),
    system_role varchar(16),
    company_id  uuid,
    foreign key (company_id) REFERENCES companies (id)
);