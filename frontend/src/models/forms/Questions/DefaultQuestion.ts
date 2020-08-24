import {defaultQuestionValues} from "../../../components/QuestionDetails/defaultValues";
import {QuestionType} from "./IQuesion";

const question = {
  id: "",
  name: defaultQuestionValues.name,
  categoryTitle: defaultQuestionValues.categoryTitle,
  "type": QuestionType.radio,
  details: {answerOptions: ["Option 1"], includeOther: false}
};

export default question;