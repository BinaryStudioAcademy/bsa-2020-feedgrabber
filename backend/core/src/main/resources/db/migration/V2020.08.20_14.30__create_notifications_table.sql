create table user_notifications(
    id uuid not null,
    text varchar(255) not null,
    request_id uuid not null,
    primary key (id),
    foreign key (request_id) references requests(id)
);