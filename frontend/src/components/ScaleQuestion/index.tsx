import React, {FunctionComponent} from 'react';
import { Form, FormikProps} from 'formik';
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

const getOptions = (from: number, to: number) => {
    const options: Array<any> = [];
    for (let i = from; i < to; i++) {
        options.push({
            key: i,
            text: `${i}`,
            value: i
        });
    }
    return options;
};

const optionsForMin = getOptions(0, 2);

const optionsForMax = getOptions(2, 11);

const ScaleQuestion: FunctionComponent<IScaleQuestionProps> = ({formik}) => {
    return ( 
        <Form className={styles.container}> 
            <div className={[styles.dropdown, styles.container].join(' ')}>
                    <Dropdown compact selection className={styles.first}
                        options={optionsForMin} 
                        defaultValue={1}
                        name="answers[0].min"
                        value={formik.values.answers.min}
                        onChange = {(e, { name, value }) => formik.setFieldValue(name, value)}/> 
                    <Dropdown compact selection 
                        options={optionsForMax}  
                        defaultValue={5}
                        name="answers[0].max"
                        value={formik.values.answers.max}
                        onChange = {(e, { name, value }) => formik.setFieldValue(name, value)}/> 
            </div>
            <div className={styles.container}>
                <div className={styles.description}>
                    <div className={styles.number}><span>1</span></div>
                    <input type="text" placeholder="description (optional)"
                            name="answers[0].minDescription"
                            value= {formik.values.answers.minDescription}
                            onChange = {formik.handleChange}/>
                </div>
                <div className={styles.description}>
                    <div className={styles.number}><span>2</span></div>
                    <input type="text" placeholder="description (optional)"
                            name="answers[0].maxDescription"
                            value= {formik.values.answers.maxDescription}
                            onChange = {formik.handleChange}/>
                </div>
            </div>
        </Form>
    );
};

export default ScaleQuestion;