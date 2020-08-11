truncate question_categories cascade;
insert into question_categories (id, title, company_id)
values
('73c44ed4-b6d3-447c-a297-112eeed47ead', 'love', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('dbaa44f0-501b-4152-b443-168d025feb17', 'sport', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('f377f0f9-4032-4a60-aa0f-78b72310024d', 'animals', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('6c5ce8bf-b103-42ec-b8ed-873f700bf47e', 'food', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('9dcfb018-edbf-4271-b9ef-914133e24be3', 'work', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('9d2f1cb8-74bf-4836-86de-86f0a7add846', 'health', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7');

insert into questions
(id, text, category_id, payload, type, company_id)
values
('31c429b6-4f13-4f8b-926d-d4ccd6c30ec0', 'Describe your feelings about company', '73c44ed4-b6d3-447c-a297-112eeed47ead', '{}', 'FREE_TEXT', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('7d44b4b0-daf8-11ea-87d0-0242ac130003', 'What do you think about our new office?', 'dbaa44f0-501b-4152-b443-168d025feb17', '{}', 'RADIO', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('80f43b08-daf8-11ea-87d0-0242ac130003', 'Are you satisfied by your team?', 'f377f0f9-4032-4a60-aa0f-78b72310024d', '{}', 'SCALE', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('83e43ab6-daf8-11ea-87d0-0242ac130003', 'Name top 3 annoying things', '6c5ce8bf-b103-42ec-b8ed-873f700bf47e', '{}', 'CHECKBOX', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
('8997a038-daf8-11ea-87d0-0242ac130003', 'How long you have been working with us?', '9dcfb018-edbf-4271-b9ef-914133e24be3', '{}', 'MULTI_CHOICE', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7');