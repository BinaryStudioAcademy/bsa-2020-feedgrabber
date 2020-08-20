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

create table respondents_requests
(
    request_id uuid not null,
    respondent_id uuid not null,
    primary key(request_id, respondent_id),
    constraint requests2respondents foreign key(request_id) references requests(id),
    constraint respondents2requests foreign key(respondent_id) references users(id)
);
