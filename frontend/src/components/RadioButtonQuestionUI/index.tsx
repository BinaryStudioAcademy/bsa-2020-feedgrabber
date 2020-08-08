import React from 'react';
import {Form, Icon, Input, Segment} from 'semantic-ui-react';
import './styles.sass';
import {FieldArray, Formik} from 'formik';
import * as yup from 'yup';

interface IRadioButtonAnswer {
    id: string;
    questionId: string;
    text: string;
}

interface IQuestion {
    id: string;
    category: string;
    text: string;
    type: string;
    answers: IRadioButtonAnswer[];
}

interface IRadioButtonQuestionUIProps {
    question: IQuestion;

    save(data: string): void;
}

const RadioButtonQuestionUI: React.FC<IRadioButtonQuestionUIProps> =
    ({question, save}) => {
        const validationSchema = yup.object().shape({
            question: yup
                .string()
                .required()
                .min(10, "min 10 characters")
                .max(200, "max 200 characters."),
            answers: yup.array()
            .of(yup.object().shape({
                text: yup.string().required()
            }))
        });

        return (
            <Formik
                enableReinitialize
                initialValues={{question: question.text, answers: question.answers, includeOther: false}}
                validationSchema={validationSchema}
                onSubmit={values => save(values.question)}
            >
                {(
                    {
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        values,
                        touched
                    }) => (
                    <Form name="questionForm" size="large" onSubmit={handleSubmit}>
                        <Segment>
                            <Form.Input
                                fluid
                                icon="at"
                                iconPosition="left"
                                placeholder="This is might be you question here..."
                                type="text"
                                name="question"
                                value={values.question}
                                error={touched.question && errors.question ? errors.question : undefined}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <FieldArray name="answers">{() => (
                                <div>
                                    {values.answers.map((answer, index) => (
                                        <div className={"answer-container"} key={index}>
                                            <Form.Input
                                                className={"answer-input"}
                                                fluid
                                                icon="circle outline"
                                                transparent
                                                iconPosition="left"
                                                placeholder="Type answer here..."
                                                type="text"
                                                name={`answers[${index}].text`}
                                                value={values.answers[index].text}
                                                error={touched.answers && errors.answers ? errors.answers : undefined}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <Icon
                                                className={"close-icon unselected"}
                                                name={"x"}
                                                size={"large"}
                                                onClick={() =>
                                                    setFieldValue("answers",
                                                        [...values.answers.filter(a => a !== answer)])
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}</FieldArray>
                            {values.includeOther && (
                                <div className={"answer-container"}>
                                    <Input
                                        className={"answer-input"}
                                        icon="circle outline"
                                        transparent
                                        iconPosition="left"
                                        value="Other..."
                                    />
                                    <Icon
                                        className={"close-icon unselected"}
                                        name={"x"}
                                        size={"large"}
                                        onClick={() =>
                                            setFieldValue("includeOther", false)
                                        }
                                    />
                                </div>
                            )}
                            <div className={"answer-container left-grouped"}>
                                <Icon
                                    className={"unselected"}
                                    name={"circle outline"}
                                />
                                <span>
                                     <span className="unselected add-answer" onClick={() => {
                                         setFieldValue("answers", [...values.answers, {
                                             id: '',
                                             questionId: question.id,
                                             text: ''
                                         }]);
                                     }}>Add new answer</span>
                                    {!values.includeOther && (
                                        <span>
                                        <span className={"unselected"}> or </span>
                                    <span className="other" onClick={() =>
                                        setFieldValue("includeOther", true)
                                    }> add "Other"</span>
                                    </span>
                                    )}
                                </span>
                            </div>
                        </Segment>
                    </Form>
                )}
            </Formik>
        );
    };
RadioButtonQuestionUI.defaultProps = {
    question: {
        id: '07944172-105f-4289-a7bf-3f23a374c15f',
        category: 'safasfas',
        text: 'Text Text Text Text Text',
        type: 'RadioButton',
        answers: [
            {
                id: '4a185810-2793-47ed-b5e5-b42401551604',
                questionId: '07944172-105f-4289-a7bf-3f23a374c15f',
                text: 'ANSWER_1'
            },
            {
                id: 'f09a4b2a-fb61-45a2-82f6-b97e56ea3b72',
                questionId: '07944172-105f-4289-a7bf-3f23a374c15f',
                text: 'ANSWER_2'
            },
            {
                id: '338dad06-485b-439e-a79b-41faba2c7da7',
                questionId: '07944172-105f-4289-a7bf-3f23a374c15f',
                text: 'ANSWER_3'
            }]
    }
};

export default RadioButtonQuestionUI;