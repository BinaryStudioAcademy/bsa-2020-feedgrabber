create table images
(
  id uuid PRIMARY KEY ,
  link varchar(255) unique not null,
  delete_hash varchar(255) unique not null
);