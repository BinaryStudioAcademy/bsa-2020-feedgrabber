alter table users
add column company_id uuid,
add foreign key (company_id) references companies (id);
