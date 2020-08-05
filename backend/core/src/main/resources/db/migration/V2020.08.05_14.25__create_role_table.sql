create table roles
(
    id          uuid primary key,
    name        varchar(255),
    description varchar(255),
    system_role varchar(16),
    company_id  uuid not null,
    foreign key (company_id) references companies (id)
);

alter table roles
    add constraint role_name_company_unique unique (name, company_id);