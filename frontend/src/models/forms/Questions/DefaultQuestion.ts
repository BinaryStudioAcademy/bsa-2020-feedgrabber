import {defaultQuestionValues} from "../../../components/QuestionDetails/defaultValues";
import {QuestionType} from "./IQuesion";

// const question = {
//   id: "",
//   name: "",
//   categoryTitle: "",
//   type: undefined,
//   details: undefined,
//   isRequired: false
// };
//
const question = {
  id: "",
  name: defaultQuestionValues.name,
  categoryTitle: defaultQuestionValues.categoryTitle,
  type: QuestionType.radio,
  details: {answerOptions: ["Option 1"], includeOther: false},
  isRequired: false
};

export default question;
