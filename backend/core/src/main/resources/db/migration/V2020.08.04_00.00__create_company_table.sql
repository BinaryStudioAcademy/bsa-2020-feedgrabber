create table companies (
    id uuid not null,
    name varchar (255),
    address varchar(255),
    phone_number varchar (255),
    corporate_email varchar(255),
    company_id uuid,
    primary key (id)
);
