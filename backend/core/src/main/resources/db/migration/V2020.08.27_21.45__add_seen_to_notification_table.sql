alter table user_notifications
add column seen boolean,
add column message_type varchar(128),
add column user_id uuid,
add column link varchar;

alter table user_notifications add foreign key (user_id) references users (id);

