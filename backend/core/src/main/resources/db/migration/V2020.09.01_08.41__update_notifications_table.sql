alter table user_notifications
add column message_type varchar(128),
add column user_id uuid,
add column payload varchar,
add column is_closed boolean not null default false;

alter table user_notifications add foreign key (user_id) references users (id);