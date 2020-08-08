interface IQuestionBase {
  id: string;
  name: string;
  categoryId: string;
  type: QuestionType;
}

interface IRadioQuestion extends IQuestionBase {
  type: QuestionType.radio;
  answerOption: string[];
}

interface IScaleQuestion extends IQuestionBase {
  type: QuestionType.scale;
  min: number;
  minDescription: string;
  max: number;
  maxDescription: string;
}

interface ITextQuestion extends IQuestionBase {
  type: QuestionType.freeText;
}

interface IDropDownQuestion extends IQuestionBase {
  type: QuestionType.dropDown;
  answerOption: string[];
}

interface ICheckboxQuestion extends IQuestionBase {
  type: QuestionType.checkbox;
  answerOption: string[];
}

export type IQuestion =
  | IDropDownQuestion
  | ITextQuestion
  | IScaleQuestion
  | IRadioQuestion
  | ICheckboxQuestion;

enum QuestionType {
  freeText = "free_text",
  radio = "radio",
  scale = "scale",
  inputField = "input_field",
  checkbox = "checkbox",
  dropDown = "drop_down"
}
