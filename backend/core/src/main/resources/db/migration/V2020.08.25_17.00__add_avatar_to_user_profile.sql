alter table user_profiles
add column avatar_id uuid;
alter table user_profiles add foreign key (avatar_id) references images (id);
