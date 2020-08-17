import * as Yup from 'yup';

export const mainSchema = Yup.object().shape({
  name: Yup.string().required('Question should have name'),
  categoryTitle: Yup.string().required('Category can not be empty')
});
