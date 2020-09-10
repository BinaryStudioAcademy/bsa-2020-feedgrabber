ALTER TABLE companies
ALTER COLUMN name TYPE varchar(40),
ALTER COLUMN name SET NOT NULL,
ADD CONSTRAINT check_name_min_length check (length(name) >= 2);

ALTER TABLE users
ALTER COLUMN email TYPE varchar(50),
ALTER COLUMN email SET NOT NULL,
ADD CONSTRAINT check_email_min_length check (length(email) >= 1),
ALTER COLUMN username TYPE varchar(20),
ALTER COLUMN username SET NOT NULL,
ADD CONSTRAINT check_username_min_length check (length(username) >= 3),
ALTER COLUMN password SET NOT NULL,
ADD CONSTRAINT check_password_min_length check (length(password) >= 1);

ALTER TABLE teams
ALTER COLUMN name TYPE varchar(40),
ALTER COLUMN name SET NOT NULL,
ADD CONSTRAINT check_name_min_length check (length(name) >= 1);

ALTER TABLE questionnaires
ALTER COLUMN title TYPE varchar(40),
ADD CONSTRAINT check_title_min_length check (length(title) >= 3);

ALTER TABLE user_profiles
ALTER COLUMN first_name TYPE varchar(30),
ADD CONSTRAINT check_first_name_min_length check (length(first_name) >= 1),
ALTER COLUMN last_name TYPE varchar(30),
ADD CONSTRAINT check_last_name_min_length check (length(last_name) >= 1);
