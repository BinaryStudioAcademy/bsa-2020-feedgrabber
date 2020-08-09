interface IQuestionBase {
  id: string;
  name: string;
  categoryId: string;
  type: QuestionTypes;
}

interface IRadioQuestion extends IQuestionBase {
  type: "radio";
  answerOptions: string[];
}

interface IScaleQuestion extends IQuestionBase {
  type: "scale";
  min: number;
  minDescription: string;
  max: number;
  maxDescription: string;
}

interface ITextQuestion extends IQuestionBase {
  type: "free_text";
}

interface IDropDownQuestion extends IQuestionBase {
  type: "drop_down";
  answerOptions: string[];
}

interface ICheckboxQuestion extends IQuestionBase {
  type: "checkbox";
  answerOptions: string[];
}

interface IMultichoiceQuestion extends IQuestionBase {
  type: "multichoice";
  answerOptions: string[];
}

export type IQuestion =
  | IDropDownQuestion
  | ITextQuestion
  | IScaleQuestion
  | IRadioQuestion
  | ICheckboxQuestion
  | IMultichoiceQuestion;

const types = ["radio", "checkbox", "scale", "free_text", "drop_down", "multichoice"] as const;
type QuestionTypes = typeof types[number];
