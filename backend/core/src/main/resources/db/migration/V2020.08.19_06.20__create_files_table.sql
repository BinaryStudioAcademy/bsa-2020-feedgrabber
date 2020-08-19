create table files
(
  id uuid PRIMARY KEY ,
  link varchar(255) unique not null,
  file_key varchar(255) unique not null
);