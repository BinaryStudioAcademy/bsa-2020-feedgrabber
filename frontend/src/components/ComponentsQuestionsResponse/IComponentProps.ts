import { IQuestion } from 'models/IQuesion';

export interface IComponentState {
    question: IQuestion;
    isAnswered: boolean;
}

export interface IComponentProps {
    question: IQuestion;
    handleChange(state: IComponentState): void;
}