alter table users drop constraint users_email_key;
alter table users add constraint users_email_key unique (email, company_id);

alter table users drop constraint users_username_key;
alter table users add constraint users_username_key unique (username, company_id);
