import {all, put, takeEvery} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {loadQuestionnaireReportRoutine, loadRespondentReportsRoutine} from "./routines";
import {IQuestionnaireReport, IRespondentReport} from "../../models/report/IReport";
import {
  ICheckboxQuestion,
  IDateQuestion,
  IQuestion,
  IRadioQuestion,
  IScaleQuestion,
  ITextQuestion,
  QuestionType
} from "../../models/forms/Questions/IQuesion";

const mockReport: IQuestionnaireReport = {
  questionnaireTitle: "Awesome Questionnaire",
  questions: [
    // {
    //   id: "00000",
    //   title: "Multichoice question",
    //   type: QuestionType.multichoice,
    //   answers: 18,
    //   data: {
    //     options: [
    //       {title: "First Option", amount: 8},
    //       {title: "Second Option", amount: 16},
    //       {title: "Third Option", amount: 3}
    //     ]
    //   }
    // },
    {
      id: "11111",
      title: "Radio question",
      type: QuestionType.radio,
      answers: 24,
      data: {
        options: [{title: "First Option", amount: 8}, {title: "Other Option", amount: 16}]
      }
    },
    {
      id: "33333",
      title: "Scale question",
      type: QuestionType.scale,
      answers: 26,
      data: {
        options: [
          {title: "1", amount: 3},
          {title: "2", amount: 2},
          {title: "3", amount: 6},
          {title: "4", amount: 5},
          {title: "5", amount: 10}
        ]
      }
    },
    {
      id: "22222",
      title: "Free Text question",
      type: QuestionType.freeText,
      answers: 3,
      data: {
        values: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
          "labore et dolore magna aliqua. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque.\n" +
          "Fames ac turpis egestas sed tempus urna. Arcu cursus euismod quis viverra nibh cras pulvinar " +
          "mattis. Magna etiam tempor orci eu lobortis. Amet cursus sit amet dictum sit amet justo donec.\n\n" +
          " Vitae sapien pellentesque habitant morbi tristique. In vitae turpis massa sed elementum tempus.\n " +
          "Ultricies lacus sed turpis tincidunt id. Volutpat consequat mauris nunc congue. Bibendum arcu" +
          " vitae elementum curabitur. Porttitor massa id neque aliquam vestibulum. Convallis convallis " +
          "tellus id interdum velit laoreet. Eu non diam phasellus vestibulum lorem sed risus.",

          "Orci eu lobortis elementum nibh tellus molestie nunc non. Vitae suscipit tellus mauris " +
          "a diam maecenas sed enim ut. Vestibulum lorem sed risus ultricies tristique nulla aliquet " +
          "enim tortor. Ipsum dolor sit amet consectetur adipiscing elit duis. Posuere urna nec " +
          "tincidunt praesent semper feugiat nibh. Egestas maecenas pharetra convallis " +
          "posuere morbi leo urna. Risus nec feugiat in fermentum. Elementum sagittis vitae et" +
          " leo duis ut diam quam. Laoreet suspendisse interdum consectetur libero. Ullamcorper " +
          "morbi tincidunt ornare massa. Eu feugiat pretium nibh ipsum consequat nisl.\n\n" +
          "Sed vulputate odio ut enim blandit volutpat maecenas. Rutrum tellus pellentesque eu" +
          " tincidunt tortor aliquam nulla. Interdum varius sit amet mattis vulputate enim.\n\n" +
          "Nam libero justo laoreet sit amet cursus sit amet.",

          "Congue mauris rhoncus aenean vel elit. A iaculis at erat pellentesque.\n" +
          "Netus et malesuada fames ac turpis egestas. Laoreet suspendisse interdum consectetur libero. " +
          "Neque vitae tempus quam pellentesque nec nam aliquam sem et.\n\n" +
          "Nunc consequat interdum varius sit amet mattis vulputate. Ut aliquam purus sit amet luctus. " +
          "Cum sociis natoque penatibus et magnis dis parturient montes nascetur. " +
          "Vitae proin sagittis nisl rhoncus mattis rhoncus urna.\n\n" +
          "Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam.\n" +
          "Congue mauris rhoncus aenean vel elit. A iaculis at erat pellentesque.\n" +
          "Netus et malesuada fames ac turpis egestas. Laoreet suspendisse interdum consectetur libero. " +
          "Neque vitae tempus quam pellentesque nec nam aliquam sem et.\n\n" +
          "Nunc consequat interdum varius sit amet mattis vulputate. Ut aliquam purus sit amet luctus. " +
          "Cum sociis natoque penatibus et magnis dis parturient montes nascetur. " +
          "Vitae proin sagittis nisl rhoncus mattis rhoncus urna.\n\n" +
          "Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam."
        ]
      }
    },
    {
      id: "55555",
      title: "Checkbox question",
      type: QuestionType.checkbox,
      answers: 15,
      data: {
        options: [{title: "English", amount:8}, {title: "Ukrainian", amount:13}]
      }
    }
  ]
};

function* loadReport(action: any) {
  try {
    const id: string = action.payload;
    // here will be API call
    // here also check if JSON response.questions[].statistics is valid - serialize it
    const report: IQuestionnaireReport = mockReport;
    yield put(loadQuestionnaireReportRoutine.success(report));
  } catch (e) {
    yield put(loadQuestionnaireReportRoutine.failure());
    toastr.error("Unable to load questionnaire report");
  }
}

function* loadRespondentReports(action: any) {
  try {
    // id of the questionnaire
    const id: string = action.payload;
    // here will be API call
    const reportsMock = Array<IRespondentReport>(
      {
        respondent: 'pasha',
        answers: Array<IQuestion>(
          {
            id: '1',
            type: QuestionType.scale,
            name: 'Rate your job:',
            answer: {
              questionId: '1',
              type: QuestionType.scale,
              body: 3
            },
            categoryTitle: 'qkation',
            isReused: false,
            details: { min: 1, minDescription: 'bad', max: 8, maxDescription: 'good' }
          } as IScaleQuestion,
          {
            id: '2',
            type: QuestionType.date,
            name: 'Birthday?',
            answer: {
              questionId: '2',
              type: QuestionType.date,
              body: '2001-07-10'
            },
            categoryTitle: 'qkation',
            isReused: false
          } as IDateQuestion,
          {
            id: '9',
            type: QuestionType.freeText,
            name: 'Enter your specialization:',
            answer: {
              questionId: '9',
              type: QuestionType.freeText,
              body: 'Java'
            },
            categoryTitle: 'qkation',
            isReused: false
          } as ITextQuestion,
          {
            id: '3',
            type: QuestionType.radio,
            name: 'some question?',
            answer: {
              questionId: '3',
              type: QuestionType.radio,
              body: {
                selected: 'laptop',
                other: ''
              }
            },
            categoryTitle: 'qkation',
            isReused: false,
            details: { includeOther: false, answerOptions: ['laptop', 'headphones', 'mouse'] }
          } as IRadioQuestion,
          {
            id: '4',
            type: QuestionType.scale,
            name: 'Some name2',
            answer: {
              questionId: '4',
              type: QuestionType.scale,
              body: 6
            },
            categoryTitle: 'qkation',
            isReused: false,
            details: { min: 1, minDescription: 'bad', max: 8, maxDescription: 'good' }
          } as IScaleQuestion)
      } as IRespondentReport,
      {
        respondent: 'king of pacha land',
        answers: Array<IQuestion>(
          {
            id: '4',
            type: QuestionType.scale,
            name: 'Some name1',
            answer: {
              questionId: '4',
              type: QuestionType.scale,
              body: 5
            },
            categoryTitle: 'qkation',
            isReused: false,
            details: { min: 1, minDescription: 'bad', max: 8, maxDescription: 'good' }
          } as IScaleQuestion,
          {
            id: '5',
            type: QuestionType.checkbox,
            name: 'Select what you want to eat:',
            answer: {
              questionId: '5',
              type: QuestionType.checkbox,
              body: {
                selected: ['apple', 'bread'],
                other: ''
              }
            },
            categoryTitle: 'qkation',
            isReused: false,
            details: { includeOther: false, answerOptions: ['apple', 'bread', 'tomatoes', 'potatoes'] }
          } as ICheckboxQuestion,
          {
            id: '7',
            type: QuestionType.checkbox,
            name: 'Select what you want to eat:',
            answer: {
              questionId: '7',
              type: QuestionType.checkbox,
              body: {
                selected: ['apple', 'bread'],
                other: 'pizza'
              }
            },
            categoryTitle: 'qkation',
            isReused: false,
            details: { includeOther: true, answerOptions: ['apple', 'bread', 'tomatoes', 'potatoes'] }
          } as ICheckboxQuestion,
          {
            id: '0',
            type: QuestionType.radio,
            name: 'some question?',
            answer: {
              questionId: '0',
              type: QuestionType.radio,
              body: {
                selected: '',
                other: 'keyboard'
              }
            },
            categoryTitle: 'qkation',
            isReused: false,
            details: { includeOther: true, answerOptions: ['laptop', 'headphones', 'mouse'] }
          } as IRadioQuestion,
          {
            id: '6',
            type: QuestionType.scale,
            name: 'Some name3',
            answer: {
              questionId: '6',
              type: QuestionType.scale,
              body: 2
            },
            categoryTitle: 'qkation',
            isReused: false,
            details: { min: 1, minDescription: 'madara', max: 8, maxDescription: 'hashirama' }
          } as IScaleQuestion)
      } as IRespondentReport
    );
    yield put(loadRespondentReportsRoutine.success(reportsMock));
  } catch (error) {
    // yield put(loadRespondentReportsRoutine.failure());
    toastr.error("Unable to load respondent reports");
  }
}

export default function* questionnaireReportSagas() {
  yield all([
    yield takeEvery(loadQuestionnaireReportRoutine.TRIGGER, loadReport),
    yield takeEvery(loadRespondentReportsRoutine.TRIGGER, loadRespondentReports)
  ]);
}
