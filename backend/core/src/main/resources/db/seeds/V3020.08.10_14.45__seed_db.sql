insert into companies
(id, name, address, phone_number, corporate_email)
values
('31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7', 'Binary Academy', 'Chornovola 59, Lviv', '+1 415-670-9788', ''),
('7f5fe156-8a95-4c69-a7fe-709dc30a95ae', 'Google', 'California, U.S.', '', ''),
('aadf2cbd-63ba-4615-8574-8f16ff6f2f32', 'Facebook', 'Cambridge, Massachusetts', '', ''),
('492f04c4-66c2-4671-869a-9409be287db1', 'SpaceX', 'Hawthorne, California, U.S.', '', ''),
('246f9299-57bf-4667-bb46-217fe64cc34c', 'NASA', 'Washington, D.C.', '', '');

insert into roles (id, name, description, system_role, company_id)
values ('1d14354d-586b-4f90-84dd-9d439cb36e52', 'Role)', 'role description', 'hr', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7');

insert into users
(id, email, username, password, role_id, company_id)
values
('1d14354d-586b-4f90-84dd-9d439cb36e52', 'anayah@gmail.com', 'Anayah','b4a6fb5a-6f18-4581-a32d-108c12b1e3ae','1d14354d-586b-4f90-84dd-9d439cb36e52', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('a9212bcd-9410-4f2c-a51e-cad095d6982b', 'avleen@gmail.com', 'Avleen','b4a6fb5a-6f18-4581-a32d-108c12b1e3ae','1d14354d-586b-4f90-84dd-9d439cb36e52', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('e1ed2f0f-b402-4208-b39b-ff8d2fbf6164', 'lilli@gmail.com', 'Lilli', 'b4a6fb5a-6f18-4581-a32d-108c12b1e3ae', '1d14354d-586b-4f90-84dd-9d439cb36e52', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('5422df61-f6dc-496d-a9bf-5c7352275d24', 'celeste@gmail.com', 'Celeste','b4a6fb5a-6f18-4581-a32d-108c12b1e3ae','1d14354d-586b-4f90-84dd-9d439cb36e52', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('df14aac7-861e-42e0-a6ed-49b9713d4d11', 'maximilian@gmail.com', 'Maximilian', 'b4a6fb5a-6f18-4581-a32d-108c12b1e3ae','1d14354d-586b-4f90-84dd-9d439cb36e52', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('eede1a9b-dce2-4038-99c5-a349082ebe77', 'qwerty@gmail.com', 'qwerty','$2a$10$u8pk7NAy.e6GsoZAZrvfAONZ2uqHAwSGTuXubrC14tXa52AC9e622','1d14354d-586b-4f90-84dd-9d439cb36e52', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7');

insert into verification_tokens
(id, token, expiration_date, user_id)
values
('722094c0-87da-408b-89f3-296a5f579887', '722094c0-87da-408b-89f3-296a5f579887', '2030-06-22 19:10:25-07', '1d14354d-586b-4f90-84dd-9d439cb36e52'),
('6406d6d9-dc89-44f7-adea-c6c99498d039', '6406d6d9-dc89-44f7-adea-c6c99498d039', '2030-06-22 19:10:25-07', 'a9212bcd-9410-4f2c-a51e-cad095d6982b'),
('3f1fd3f4-9e8c-4c34-9d72-48f89994d3b8', '3f1fd3f4-9e8c-4c34-9d72-48f89994d3b8', '2030-06-22 19:10:25-07', 'e1ed2f0f-b402-4208-b39b-ff8d2fbf6164'),
('23220264-8340-4b35-bd5d-1627a5634b50', '23220264-8340-4b35-bd5d-1627a5634b50', '2030-06-22 19:10:25-07', '5422df61-f6dc-496d-a9bf-5c7352275d24'),
('3dcbeb79-4813-472b-a398-7cc0de01148e', '3dcbeb79-4813-472b-a398-7cc0de01148e', '2030-06-22 19:10:25-07', 'df14aac7-861e-42e0-a6ed-49b9713d4d11');

insert into question_categories (id, title, company_id)
values
('73c44ed4-b6d3-447c-a297-112eeed47ead', 'I am a title!', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('dbaa44f0-501b-4152-b443-168d025feb17', 'Why teapots are red?', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('f377f0f9-4032-4a60-aa0f-78b72310024d', '!', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('6c5ce8bf-b103-42ec-b8ed-873f700bf47e', 'Racoons!', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('9dcfb018-edbf-4271-b9ef-914133e24be3', 'Fish-dish!', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('9d2f1cb8-74bf-4836-86de-86f0a7add846', 'Is Lama from Alabama?', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('d31db4fe-56cf-4bd0-a247-88db36492d2f', 'Sweetie title!', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('d5deb7ec-de3f-4e9f-b959-089c0146a217', 'I am not a title!', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('ff79991b-bb97-4d2d-abc2-955dad34f945', 'I am a taitle?', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('e5d8898c-11f2-4fe3-b82b-dec9b5bf9822', 'I am a title?', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7');

insert into questions
(id, text, category_id, payload, type, company_id)
values
('31c429b6-4f13-4f8b-926d-d4ccd6c30ec0', 'Describe your feelings about company', '73c44ed4-b6d3-447c-a297-112eeed47ead', '{}', 'FREE_TEXT', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('7d44b4b0-daf8-11ea-87d0-0242ac130003', 'What do you think about our new office?', 'dbaa44f0-501b-4152-b443-168d025feb17', '{}', 'FREE_TEXT', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('80f43b08-daf8-11ea-87d0-0242ac130003', 'Are you satisfied by your team?', '9d2f1cb8-74bf-4836-86de-86f0a7add846', '{}', 'FREE_TEXT', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('83e43ab6-daf8-11ea-87d0-0242ac130003', 'Name top 3 annoying things', 'd5deb7ec-de3f-4e9f-b959-089c0146a217', '{}', 'FREE_TEXT', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('8997a038-daf8-11ea-87d0-0242ac130003', 'How long you have been working with us?', '6c5ce8bf-b103-42ec-b8ed-873f700bf47e', '{}', 'FREE_TEXT', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7');

insert into questionnaires
(id, title, company_id)
values
('da1bd626-dafa-11ea-87d0-0242ac130003', 'Introduce yourself to Us!', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('e06193ae-dafa-11ea-87d0-0242ac130003', 'Moving to new Office', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('e494dc9c-dafa-11ea-87d0-0242ac130003', 'Your feelings after a year with us', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7');

insert into teams
(id, name, company_id)
values
('953f401c-7ba7-4523-805e-6fee70e2cb14', 'Hipsters', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('5d538bc8-0644-42de-b1eb-d8afaf47871e', 'Geeks', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('6ec4bcdc-7121-4dcf-b186-616cbb5c488c', 'Hackers', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('2591bf93-d4e4-4fce-95b6-c730c7ef5fdd', 'Nerds', '7f5fe156-8a95-4c69-a7fe-709dc30a95ae'),
('99abe5fc-8a24-4d2e-91b7-af68cb67fb5e', 'Olds', '7f5fe156-8a95-4c69-a7fe-709dc30a95ae');
