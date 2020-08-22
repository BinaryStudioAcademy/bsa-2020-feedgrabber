drop table invitations;

create table invitations
(
    id         uuid         not null,
    company_id uuid         not null references companies (id),
    email      varchar(255) not null,
    created_at timestamp    not null,
    accepted   boolean      not null,
    primary key (id),
    unique (company_id, email)
);