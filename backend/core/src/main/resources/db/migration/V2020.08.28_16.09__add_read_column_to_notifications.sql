alter table user_notifications
add column is_read boolean not null default false;
