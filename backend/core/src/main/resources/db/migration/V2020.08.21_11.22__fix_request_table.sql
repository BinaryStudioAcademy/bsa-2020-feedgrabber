alter table requests
    drop column creation_date,
    drop column expiration_date,
    add column creation_date timestamp,
    add column expiration_date timestamp;
