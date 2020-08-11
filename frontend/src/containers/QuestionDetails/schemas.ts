import * as Yup from 'yup';

export const multichoiceSchema = Yup.object().shape({
  name: Yup.string().required('required'),
  answers: Yup.array()
    .of(Yup
      .string()
      .required(`Answer can't be empty`)
      .max(200, 'Answer must be shorter then 200 symbols')
    )
    .min(3, 'A multiple choice question must contain at least 3 answer choices')
});

export const radioSchema = Yup.object().shape({
    name: Yup.string().required('required'),
    answers: Yup.array()
    .of(Yup
      .string()
      .required(`Answer can't be empty`)
      .max(200, 'Answer must be shorter then 200 symbols')
    )
    .min(3, 'A multiple choice question must contain at least 3 answer choices')
});

export const checkboxSchema = Yup.object().shape({
    name: Yup.string().required('required'),
    answers: Yup.array()
    .of(Yup
      .string()
      .required(`Answer can't be empty`)
      .max(200, 'Answer must be shorter then 200 symbols')
    )
    .min(3, 'A multiple choice question must contain at least 3 answer choices')
});

export const scaleSchema = Yup.object().shape({
  name: Yup.string().required('required')
});