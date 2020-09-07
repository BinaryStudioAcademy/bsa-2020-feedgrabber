-- alter table users drop constraint users_email_key;
-- alter table users drop constraint users_username_key;

alter table users add column is_deleted boolean default ('f');
