CREATE TABLE news (
    id uuid not null,
    title varchar(255),
    type varchar(255),
    body text,
    image_id uuid,
    user_id uuid not null,
    company_id uuid not null,
    created_at timestamp not null,
    primary key(id),
    foreign key(image_id) references images(id),
    foreign key (user_id) references users(id),
    foreign key (company_id) references companies(id)
);
