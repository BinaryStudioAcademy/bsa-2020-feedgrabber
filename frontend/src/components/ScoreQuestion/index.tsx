import React, {FunctionComponent} from 'react';
import { Formik } from 'formik';
import { Dropdown, Input } from 'semantic-ui-react';
import styles from './styles.module.sass';

interface IQuestion {
    min: number;
    minDescription?: string;
    max: number;
    maxDescription?: string;
}

interface IScaleQuestionProps {
    id: string;
    question: IQuestion;
}

const optionsForMin = [
    { key: 1, text: '0', value: 0 },
    { key: 2, text: '1', value: 1 }
];

const optionsForMax = [
    { key: 1, text: '2', value: 2},
    { key: 2, text: '3', value: 3},
    { key: 3, text: '4', value: 4},
    { key: 4, text: '5', value: 5},
    { key: 5, text: '6', value: 6},
    { key: 6, text: '7', value: 7},
    { key: 7, text: '8', value: 8},
    { key: 8, text: '9', value: 9},
    { key: 9, text: '10', value: 10}
];

const ScaleQuestion: FunctionComponent<IScaleQuestionProps> = ({id, question}) => {
    return (
        <div className={styles.container}>
            <div className={[styles.dropdown, styles.container].join(' ')}>
                <Dropdown compact selection 
                options={optionsForMin}  defaultValue={question.min} className={styles.first}/>
                <Dropdown compact selection 
                options={optionsForMax}  defaultValue={question.max}/> 
            </div>
            <div className={styles.container}>
                <div className={styles.description}>
                    <div className={styles.number}><span>1</span></div>
                    <input type="text" placeholder="description (optional)"/>
                </div>
                <div className={styles.description}>
                    <div className={styles.number}><span>2</span></div>
                    <input type="text" placeholder="description (optional)"/>
                </div>
            </div>
        </div>
    );
};

ScaleQuestion.defaultProps = {
     id: "",
     question: {
         min: 1,
         max: 5
     }
};

export default ScaleQuestion;