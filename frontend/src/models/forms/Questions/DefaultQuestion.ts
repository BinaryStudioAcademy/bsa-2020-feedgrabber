import {defaultQuestionValues} from "../../../components/QuestionDetails/defaultValues";
import {IQuestion, QuestionType} from "./IQuesion";
import {IAnswerBody} from "../Response/types";

const question: IQuestion = {
  id: "",
  name: defaultQuestionValues.name,
  categoryTitle: defaultQuestionValues.categoryTitle,
  type: QuestionType.radio,
  details: {answerOptions: ["Option 1"], includeOther: false},
  isRequired: false,
  isReused: false,
  answer: {} as IAnswerBody
};

export default question;
