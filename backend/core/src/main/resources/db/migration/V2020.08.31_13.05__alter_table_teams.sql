alter table teams
    add column lead_id uuid,
    add foreign key (lead_id) references users (id);