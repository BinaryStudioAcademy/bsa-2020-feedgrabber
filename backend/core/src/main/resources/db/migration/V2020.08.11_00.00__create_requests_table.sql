create table requests
(
  id uuid not null,
  questionnaire_id uuid not null,
  target_user_id uuid,
  request_maker_id uuid not null,
  creation_date time not null,
  expiration_date time,
  notify_users boolean not null,
  generate_report boolean not null,
  primary key(id),
  foreign key(questionnaire_id) references questionnaires(id),
  foreign key(target_user_id) references users(id),
  foreign key(request_maker_id) references users(id)
);
