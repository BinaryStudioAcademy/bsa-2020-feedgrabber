insert into question_categories (id, title, company_id)
values ('03229560-cd9c-40c7-a47a-d10a29a157be', 'Soft skills', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7'),
       ('e04631e9-88cd-4685-8487-6f6556dc8f4e', 'Hard skills', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7');

insert into questionnaires (id, title, company_id)
values ('260f4a4d-4b2c-4baa-88b0-670946b8a9a5', 'Interview', '31c6aeb4-3dad-4bbf-a3d1-21069ac67fc7');

insert into questions (id, text, category_id, questionnaire_id)
values ('22b64dda-f799-4aec-9377-d687fd55a599', 'What about you soft skills?',
        '03229560-cd9c-40c7-a47a-d10a29a157be', '260f4a4d-4b2c-4baa-88b0-670946b8a9a5'),
       ('5930ca7e-ade1-4488-b31d-cf155266949d', 'What about you hard skills?',
        'e04631e9-88cd-4685-8487-6f6556dc8f4e', '260f4a4d-4b2c-4baa-88b0-670946b8a9a5');