// import QuestionItem from "components/Question";
import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import "./style.sass";

export enum TypesMock {
  INPUT,
  ONE_CHOICE,
  MULTIPLE_CHOICE
}

export enum CategoriesMock {
  CATS,
  DOGS
}

export type Question = {
  id: number;
  type: TypesMock;
  category: CategoriesMock;
  header: string;
  body?: string;
  image?: string;
};

const questionMockSingle = (id: number): Question => {
  return {
    id: id,
    type: TypesMock.INPUT,
    category: CategoriesMock.CATS,
    header: "New Task"
  };
};

const questionsMock: Question[] = [
  {
    id: 0,
    type: TypesMock.INPUT,
    category: CategoriesMock.CATS,
    header: "Cats Plain",
    body: "Cats blahblahblahblah"
  },
  {
    id: 1,
    type: TypesMock.ONE_CHOICE,
    category: CategoriesMock.DOGS,
    header: "Dogs One Choice",
    image:
      "https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/6/2019/10/08113321"
      + "/Dog-behavior-Kasper-Luijsterburg.jpg"
  },
  {
    id: 2,
    type: TypesMock.MULTIPLE_CHOICE,
    category: CategoriesMock.CATS,
    header: "Cats Multiple"
  }
];

const FormQuestionnaire = () => {

  const [questions, setQuestions] = useState([...questionsMock]);
  // const [selected, setSelected] = useState(null);

  return (
    <>
      <Menu fixed='top' position='right'>
        <Menu.Menu position='right'>
          <Menu.Item header icon='add circle'
            onClick={() => setQuestions([...questions, questionMockSingle(questions.length)])} />
          <Menu.Item icon='image outline' />
          <Menu.Item icon='font' />
        </Menu.Menu>
      </Menu>
      <div className="form_wrapper">
        <div className="form_questions_wrapper" >
          {/* {
            questions.map((question: Question) =>
              <QuestionItem question={question} select={()=>setSelected(question.id)}></QuestionItem>
            )
          } */}
        </div>
      </div>
    </>);
};

export default FormQuestionnaire;
