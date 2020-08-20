import React, {FC, useEffect, useState} from 'react';

import UIPageTitle from "../UI/UIPageTitle";
import UIButton from "../UI/UIButton";
import UICard from "../UI/UICard";
import UIContent from "../UI/UIContent";
import UICardBlock from "../UI/UICardBlock";
import UIColumn from "../UI/UIColumn";
import { IAppState } from 'models/IAppState';
import { connect } from "react-redux";
import { loadRequestedQuestionnairesRoutine } from 'sagas/request/routines';
import LoaderWrapper from 'components/LoaderWrapper';
import { history } from '../../helpers/history.helper';
import { IQuestionnaireResponse } from 'models/forms/Response/types';
import { IQuestionnaire } from 'models/forms/Questionnaires/types';
import { createResponseRoutine } from 'sagas/questionnaireResponse/routines';
import { IUserShort } from 'models/user/types';
import { loadOneQuestionnaireRoutine } from 'sagas/qustionnaires/routines';

interface IItem {
  id: string;
  header?: string;
  content?: string;
  author?: string;
}

interface ICreateResponse {
  requestId: string;
  respondentId: string;
}

interface IMainPageProps {
  questionnaireList: IQuestionnaireResponse[];
  reportsList?: IItem[];
  newsList?: IItem[];
  isLoading: boolean;
  user: IUserShort;

  loadQuestionnaires(): void;
  createResponse(response: ICreateResponse): void;
}

const MainPage: FC<IMainPageProps> =
  ({questionnaireList, reportsList = [], newsList = [], isLoading, user,
     loadQuestionnaires, createResponse}) => {

    useEffect(() => {
      if(!questionnaireList && !isLoading){
        loadQuestionnaires();
      }
    }, [questionnaireList, loadQuestionnaires]);

    const handleAnswerClick = (requestId, questionnaireId) => {
      const response = {
        requestId: requestId,
        respondentId: user.id
      };
      createResponse(response);
      history.push(`/response/${questionnaireId}`);
    };

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
              {questionnaireList && questionnaireList.map(item => (
                <UICardBlock key={item.requestId}>
                  {item.questionnaire.title && <h4>{item.questionnaire.title}</h4>}
                  {item.questionnaire.description && <p>{item.questionnaire.description}</p>}
                  {item.questionnaire.companyName && <p><b>{item.questionnaire.companyName}</b></p>}
                  <UIButton title="Answer" onClick={() => handleAnswerClick(item.requestId, item.questionnaire.id)}/>
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
  questionnaireList: state.questionnaireResponse.list,
  isLoading: state.questionnaireResponse.isLoading,
  user: state.user.shortInfo
});

const MapDispatchToProps = {
  loadQuestionnaires: loadRequestedQuestionnairesRoutine,
  createResponse: createResponseRoutine
};

export default connect(MapStateToProps, MapDispatchToProps) (MainPage);