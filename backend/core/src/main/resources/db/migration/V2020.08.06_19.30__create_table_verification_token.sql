create table verification_tokens
(
    id    uuid not null,
    token varchar(255),
    expiration_date timestamp,
    user_id uuid,
    primary key(id)
);