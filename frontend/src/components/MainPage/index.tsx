import React, {FC, useEffect} from 'react';

import UIPageTitle from "../UI/UIPageTitle";
import UIButton from "../UI/UIButton";
import UICard from "../UI/UICard";
import UIContent from "../UI/UIContent";
import UICardBlock from "../UI/UICardBlock";
import UIColumn from "../UI/UIColumn";
import { IAppState } from 'models/IAppState';
import { connect } from "react-redux";
import { loadRequestedQuestionnairesRoutine } from 'sagas/qustionnaires/routines';
import { IQuestionnaire } from 'models/forms/Questionnaires/types';
import LoaderWrapper from 'components/LoaderWrapper';

interface IItem {
  id: string;
  header?: string;
  content?: string;
  author?: string;
}

interface IMainPageProps {
  questionnaireList: IQuestionnaire[];
  reportsList?: IItem[];
  newsList?: IItem[];
  isLoading: boolean;

  loadQuestionnaires(): void;
}

const MainPage: FC<IMainPageProps> =
  ({questionnaireList, reportsList = [], newsList = [], isLoading, loadQuestionnaires}) => {

    useEffect(() => {
      if (!questionnaireList && !isLoading) {
          loadQuestionnaires();
      }
    }, [questionnaireList, isLoading, loadQuestionnaires]);

    return (
    <>
      <UIPageTitle title="Home"/>
      <UIContent>
        <UIColumn>
          <UICard>
            <UICardBlock>
              <h3>Pending Questionnaires</h3>
            </UICardBlock>
            <LoaderWrapper loading={isLoading}>
              {questionnaireList && questionnaireList.map(question => (
                <UICardBlock key={question.id}>
                  {question.title && <h4>{question.title}</h4>}
                  {question.description && <p>{question.description}</p>}
                  {question.companyName && <p><b>{question.companyName}</b></p>}
                  <UIButton title="Answer"/>
                </UICardBlock>
              ))}
            </LoaderWrapper>
          </UICard>
        </UIColumn>

        <UIColumn>
          <UICard>
            <UICardBlock>
              <h3>My Reports</h3>
            </UICardBlock>
            {reportsList.map(item => (
              <UICardBlock key={item.id}>
                {item.header && <h4>{item.header}</h4>}
                {item.content && <p>{item.content}</p>}
                {item.author && <p><b>{item.author}</b></p>}
                <UIButton title="Details"/>
              </UICardBlock>
            ))}
          </UICard>
        </UIColumn>

        <UIColumn wide>
          <UICard>
            <UICardBlock>
              <h3>Company NewsFeed</h3>
            </UICardBlock>
            {newsList.map(item => (
              <UICardBlock key={item.id}>
                {item.header && <h4>{item.header}</h4>}
                {item.content && <p>{item.content}</p>}
                {item.author && <p><b>{item.author}</b></p>}
              </UICardBlock>
            ))}
          </UICard>
        </UIColumn>
      </UIContent>
    </>
  );};

const MapStateToProps = (state: IAppState) => ({
  questionnaireList: state.questionnaires.list.questionnaires,
  isLoading: state.questionnaires.list.isLoading
});

const MapDispatchToProps = {
  loadQuestionnaires: loadRequestedQuestionnairesRoutine
};

export default connect(MapStateToProps, MapDispatchToProps) (MainPage);