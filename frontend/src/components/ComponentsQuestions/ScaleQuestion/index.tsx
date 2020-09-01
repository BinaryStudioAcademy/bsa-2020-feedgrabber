import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import {
    IGenericQuestionComponent,
    useInitValue,
    validState
  } from "../IQuestionInputContract";
import styles from './styles.module.sass';
import {IScaleDetails} from "../../../models/forms/Questions/IQuesion";

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

const ScaleQuestion: IGenericQuestionComponent<IScaleDetails> = ({
    value: propValue,
    onValueChange
}) => {

    const values = useInitValue(
         {value: {min: 1, max: 5, minDescription: "", maxDescription: ""}, isCompleted: true},
         propValue,
         onValueChange
    );

    return (
        <div className={styles.container}>
            <div className={[styles.dropdown, styles.container].join(' ')}>
                    <Dropdown compact selection className={styles.first}
                        options={optionsForMin}
                        name="min"
                        value={values.min}
                        onChange = {(e, data) => {
                            onValueChange(
                                    validState({
                                        ...values,
                                        min: Number(data.value)
                                    }));}}/>
                    <Dropdown compact selection
                        options={optionsForMax}
                        name="max"
                        value={values.max}
                        onChange = {(e, data) => onValueChange(
                                    validState({
                                        ...values,
                                        max: Number(data.value)
                                    }))}/>
            </div>
            <div className={styles.container}>
                <div className={styles.description}>
                    <div className={styles.number}><span>1</span></div>
                    <input type="text" placeholder="description (optional)"
                            name="minDescription"
                            value= {values.minDescription}
                            onChange = {event => {
                                onValueChange(
                                validState({
                                    ...values,
                                    minDescription: event.target.value
                                }));}}/>
                </div>
                <div className={styles.description}>
                    <div className={styles.number}><span>2</span></div>
                    <input type="text" placeholder="description (optional)"
                            name="maxDescription"
                            value= {values.maxDescription}
                            onChange = {event => onValueChange(
                                validState({
                                    ...values,
                                    maxDescription: event.target.value
                                }))}/>
                </div>
            </div>
        </div>
    );
};

export default ScaleQuestion;
