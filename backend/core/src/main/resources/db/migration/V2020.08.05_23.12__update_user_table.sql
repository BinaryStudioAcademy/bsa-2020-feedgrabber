alter table users
add column role_id uuid not null,
add foreign key (role_id) references roles (id);