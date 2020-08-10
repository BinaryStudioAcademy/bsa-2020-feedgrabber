import React, {FunctionComponent} from 'react';
import { Formik, FormikProps } from 'formik';
import { Dropdown } from 'semantic-ui-react';
import styles from './styles.module.sass';

interface IQuestion {
    min: number;
    minDescription: string;
    max: number;
    maxDescription: string;
}

interface IScaleQuestionProps {
    formik: FormikProps<any>;
}

interface IFormValues {
    answers: IQuestion[];
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

const ScaleQuestion: FunctionComponent<IScaleQuestionProps> = ({formik}) => {
    const initialValues: IFormValues = {
        answers: [{
            min: 1,
            minDescription: "",
            max: 5,
            maxDescription: ""
        }]
    };
    return (
        <Formik
            initialValues={formik.initialValues.length ? formik.initialValues: initialValues}
            onSubmit={values => {console.log(values);}}> 
        <div className={styles.container}>
            <div className={[styles.dropdown, styles.container].join(' ')}>
                <Dropdown compact selection className={styles.first}
                    options={optionsForMin}  
                    defaultValue={initialValues.answers[0].min} 
                    onChange = {formik.handleChange}/>
                <Dropdown compact selection 
                    options={optionsForMax}  
                    defaultValue={initialValues.answers[0].max}
                    onChange = {formik.handleChange}/> 
            </div>
            <div className={styles.container}>
                <div className={styles.description}>
                    <div className={styles.number}><span>1</span></div>
                    <input type="text" placeholder="description (optional)"
                            defaultValue={initialValues.answers[0].minDescription}
                            onChange = {formik.handleChange}/>
                </div>
                <div className={styles.description}>
                    <div className={styles.number}><span>2</span></div>
                    <input type="text" placeholder="description (optional)"
                            defaultValue={initialValues.answers[0].maxDescription}
                            onChange = {formik.handleChange}/>
                </div>
            </div>
        </div>
        </Formik>
    );
};

export default ScaleQuestion;