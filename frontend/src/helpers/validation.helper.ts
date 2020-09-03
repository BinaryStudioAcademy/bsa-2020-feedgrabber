import * as yup from 'yup';

const validation = {
  firstName: yup
      .string()
      .min(3, "Too short first name")
      .max(20, "Too long first name")
      .matches(new RegExp(['^([A-Za-zаАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯіІїЇґҐ])',
            '([ \\-`,]?[A-Za-zаАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯіІїЇґҐ])*$'].join('')),
          "First name is invalid"),

  lastName: yup
      .string()
      .min(3, "Too short first name")
      .max(20, "Too long first name")
      .matches(new RegExp(['^([A-Za-zаАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯіІїЇґҐ])',
            '([ \\-`,]?[A-Za-zаАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯіІїЇґҐ])*$'].join('')),
          "Last name is invalid"),

  phoneNumber: yup
      .string()
      .min(7, "Too short phone number")
      .max(20, "Too long phone number"),

  username: yup
  .string()
      .required("Username required")
      .min(3, "Username too short!")
      .max(20, "Username too long!")
      .matches(/^\w([A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])([ ]?[A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])*$/,
          "Username is invalid"),

  password:  yup
      .string()
      .required("Username required")
      .min(3, "Username too short!")
      .max(20, "Username too long!")
      .matches(/^\w([A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])([ ]?[A-Za-zА-Яа-я\d!#$%&'*+\-/=?^_`])*$/,
          "Username is invalid")
};

export default validation;