import * as Yup from 'yup';

export const mainSchema = Yup.object().shape({
  name: Yup.string()
      .min(1, "Enter question")
      .max(100, "Max length is 40 symbols")
      .matches(/\S/, "Question must contain not only whitespaces")
      .required('Question should have name'),
  categoryTitle: Yup.string().required('Category can not be empty')
});
