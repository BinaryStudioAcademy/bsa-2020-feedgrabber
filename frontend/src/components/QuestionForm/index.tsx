import React, {FC, useState} from "react";
import {IQuestion, QuestionType} from "../../models/forms/Questions/IQuesion";
import {IAppState} from "models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {loadCategoriesRoutine} from "sagas/categories/routines";
import {Checkbox, Divider, Form, Icon, Loader, Popup} from "semantic-ui-react";
import {
    addQuestionToSectionRoutine,
    deleteQuestionFromSectionRoutine,
    updateQuestionInSectionRoutine
} from "../../sagas/sections/routines";
import {isEmpty} from 'lodash';
import {useFormik} from "formik";
import {renderForm} from "./defaultValues";
import styles from "./styles.module.sass";
import {useTranslation} from "react-i18next";
import QuestionDetailsOptions from "./QuestionDetailsOptions";
import {mainSchema} from "./schemas";
import defaultQuestion from "../../models/forms/Questions/DefaultQuestion";

export interface IQuestionListEditProps {
    addQuestion: (question) => void;
    cancel: () => void;
    deleteQuestion: (id: string) => void;
}

const QuestionForm: FC<QuestionDetailsProps & { listEdit?: IQuestionListEditProps }> = (
    {
        listEdit,
        currentQuestion,
        isLoading,
        updateQuestion,
        loadCategories,
        questionnaireId,
        section,
        deleteQuestion,
        categories,
        sections,
        addQuestion
    }) => {
    const [isValid, setValid] = useState(false);
    const [localCategories, setLocalCategories] = useState<string[]>(categories);
    const [t] = useTranslation();
    const formik = useFormik({
        initialValues: {
            question: currentQuestion,
            name: currentQuestion.name,
            categoryTitle: currentQuestion.categoryTitle,
            isRequired: currentQuestion.isRequired
        },
        validationSchema: mainSchema,
        onSubmit: () => console.log()
    });

    const handleQuestionDetailsUpdate = state => {
        console.log(state);
        const {isCompleted, value} = state;
        formik.setFieldValue("question", {...formik.values.question, details: value});
        setValid(isCompleted && formik.isValid);
    };

    const onCopy = () => {
        const s = section ?? sections[sections.length - 1];
        addQuestion({
            ...currentQuestion,
            name: `${currentQuestion.name} (copy)`,
            sectionId: s.id,
            index: s.questions.length
        });
    };

    const onDelete = () => {
        listEdit
            ? listEdit.deleteQuestion(currentQuestion.id)
            : deleteQuestion({
                questionId: currentQuestion.id,
                sectionId: section.id
            });
    };

    const onSubmit = () => {
        const q = formik.values.question;
        const qd = !isEmpty(currentQuestion) ? currentQuestion : defaultQuestion;
        listEdit
            .addQuestion(
                {
                    ...qd,
                    ...q
                });
        if (isValid) {
            const q = formik.values.question;
            const qd = !isEmpty(currentQuestion) ? currentQuestion : defaultQuestion;
            listEdit ?
                listEdit
                    .addQuestion(
                        {
                            ...qd,
                            ...q
                        })
                : !q.id ?
                addQuestion({
                    ...q,
                    questionnaireId,
                    sectionId: section.id
                }) :
                updateQuestion({
                    ...q,
                    sectionId: section.id
                });
        }
    };

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (!isEqual(q, question)) {
    //             onSubmit();
    //         }
    //     }, 3000);
    //     return () => clearTimeout(timer);
    // }, [q, question, onSubmit]);

    const setQuestionType = (data: any) => {
        const type: QuestionType = data.value;
        formik.setFieldValue("question", {...formik.values.question, type, details: undefined});
    };

    const parseCategories = () => localCategories.map(cat => ({key: cat, value: cat, text: cat}));

    return (
        <div className={`${styles.question_container}`}>
            {isLoading ?
                <Loader active inline='centered'/>
                :
                <div className={styles.question_container}>
                    <Form className={styles.question_form}>
                        <div className={styles.question_input_type}>
                            <Form.Input
                                className={styles.question_input}
                                fluid
                                id="name"
                                placeholder={t("Type your question")}
                                type="text"
                                value={formik.values.name}
                                name="name"
                                error={
                                    formik.touched.name && formik.errors.name
                                        ? t(formik.errors.name)
                                        : undefined
                                }
                                onChange={formik.handleChange}
                            />
                            <QuestionDetailsOptions
                                question={formik.values.question}
                                setQuestionType={setQuestionType}
                            />
                        </div>
                        <Form.Dropdown
                            id="categoryTitle"
                            placeholder={t('Choose category or type custom')}
                            closeOnBlur
                            onClick={loadCategories}
                            allowAdditions
                            additionLabel={t('Add new category: ')}
                            onChange={formik.handleChange}
                            value={formik.values.categoryTitle}
                            onAddItem={(e, {value}) => {
                                setLocalCategories([value as string, ...localCategories]);
                            }}
                            search
                            selection
                            error={formik.touched.categoryTitle && formik.errors.categoryTitle
                                ? t(formik.errors.categoryTitle)
                                : undefined}
                            options={parseCategories()}
                            onBlur={formik.handleBlur}
                        />{' '}
                        <Divider/>
                        <div className={styles.question_form_answers}>
                            {renderForm(formik.values.question, handleQuestionDetailsUpdate)}
                        </div>
                        <Divider/>
                        <div className={styles.actions}>
                            {listEdit &&
                            <>
                                <Popup content={"Save"}
                                       trigger={(
                                           <span
                                               className={styles.icon}
                                               onClick={onSubmit}>
                                            <Icon name="save outline" size="large"/>
                                        </span>
                                       )}
                                />
                                <Popup content={"Cancel"}
                                       trigger={(
                                           <span className={styles.icon} onClick={() => listEdit.cancel()}>
                                            <Icon name="close" size="large"/>
                                        </span>
                                       )}
                                />
                            </>
                            }
                            {onDelete &&
                            <Popup content={"Delete"}
                                   trigger={(
                                       <span className={styles.icon} onClick={onDelete}>
                                            <Icon name="trash alternate outline" size="large"/>
                                        </span>
                                   )}
                            />
                            }
                            {currentQuestion?.id && onCopy &&
                            <Popup content={"Copy"}
                                   trigger={(
                                       <span className={styles.icon} onClick={onCopy}>
                                           <Icon name="clone outline" size="large"/>
                                       </span>
                                   )}
                            />
                            }
                            <Popup
                                content={t("Required")}
                                trigger={
                                    <Checkbox
                                        toggle
                                        id="isRequired"
                                        name="isRequired"
                                        checked={formik.values.isRequired}
                                        onChange={formik.handleChange}
                                    />}
                            />
                        </div>
                    </Form>
                </div>
            }
        </div>
    );
};

const mapState = (state: IAppState) => ({
    isLoading: state.formEditor.isLoading,
    categories: state.categories.list,
    currentQuestion: state.formEditor.currentQuestion,
    questionnaireId: state.formEditor.questionnaire.id,
    section: state.formEditor.sections.current,
    sections: state.formEditor.sections.list
});

const mapDispatch = {
    addQuestion: addQuestionToSectionRoutine,
    updateQuestion: updateQuestionInSectionRoutine,
    loadCategories: loadCategoriesRoutine,
    deleteQuestion: deleteQuestionFromSectionRoutine
};

const connector = connect(mapState, mapDispatch);

type QuestionDetailsProps = ConnectedProps<typeof connector>;

export default connector(QuestionForm);
