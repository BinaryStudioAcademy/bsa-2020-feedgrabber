create table questionnaires
(
    id         uuid         not null,
    title      varchar(255) not null,
    company_id uuid         not null references companies (id),
    primary key (id),
    unique (title, company_id)
);