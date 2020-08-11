ALTER TABLE questions
DROP CONSTRAINT questions_category_id_fkey,
DROP COLUMN questionnaire_id,
ADD CONSTRAINT text_category_id_unique unique("text", category_id);
