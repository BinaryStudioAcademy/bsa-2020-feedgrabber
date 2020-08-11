create table teams
(
    id         uuid         not null,
    name       varchar(255),
    company_id uuid not null,
    primary key (id)
);

create unique index name_company_id ON teams (company_id, UPPER(name));

alter table if exists teams
    add constraint fk_teams2companies foreign key (company_id) references companies;

create table users_teams
(
    user_id uuid not null,
    team_id uuid not null,
    primary key(user_id, team_id),
    constraint fk_users2teams foreign key(user_id) references users(id),
    constraint fk_teams2users foreign key(team_id) references teams(id)
);