create table teams
(
    id         uuid         not null,
    name       varchar(255),
    company_id uuid,
    primary key (id)
);

create unique index name_company_id ON teams (company_id, UPPER(name));

alter table if exists teams
    add constraint fk_teams2companies foreign key (company_id) references companies;