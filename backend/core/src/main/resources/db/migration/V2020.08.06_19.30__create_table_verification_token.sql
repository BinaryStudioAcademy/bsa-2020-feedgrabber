create table verification_tokens
(
    id uuid not null,
    token varchar(255),
    expiration_date timestamp,
    user_id uuid not null,
    primary key(id),
    foreign key(user_id)
        references users(id)
);