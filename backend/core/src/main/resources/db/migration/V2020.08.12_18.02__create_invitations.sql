create table invitations
(
    id         uuid not null,
    company_id uuid not null references companies (id),
    primary key (id),
    unique (company_id)
);