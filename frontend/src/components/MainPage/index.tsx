import React, { FC, useEffect, useState } from 'react';
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
import { IQuestionnaire, IRequest } from 'models/forms/Questionnaires/types';
import { getResponseRoutine, addRequestIdToCurrentResponseRoutine } from 'sagas/response/routines';
import { IUserShort } from 'models/user/types';
import { loadOneQuestionnaireRoutine } from 'sagas/qustionnaires/routines';
import styles from './styles.module.sass';

interface IItem {
  id: string;
  header?: string;
  content?: string;
  author?: string;
}

interface IMainPageProps {
  questionnaireList: IQuestionnaireResponse[];
  reportsList?: IItem[];
  newsList?: IItem[];
  isLoading: boolean;

  loadQuestionnaires(): void;
  getResponse(requestId: string): void;
}

const MainPage: FC<IMainPageProps> =
  ({ questionnaireList, reportsList = [], newsList = [], isLoading, loadQuestionnaires, getResponse }) => {

    useEffect(() => {
      if (!questionnaireList && !isLoading) {
        loadQuestionnaires();
      }
    }, [loadQuestionnaires]);

    const handleAnswerClick = (requestId, questionnaireId) => {
      getResponse(requestId);
      history.push(`/response/${questionnaireId}`);
    };

    return (
      <>
        <UIPageTitle title="Home" />
        <UIContent>
          <UIColumn>
            <UICard>
              <UICardBlock>
                <h3>Pending Questionnaires</h3>
              </UICardBlock>
              <LoaderWrapper loading={isLoading}>
                {questionnaireList && questionnaireList.map(
                    (
                        {   requestId,
                            questionnaire,
                            expirationDate,
                            alreadyAnswered }) => (
                  <UICardBlock key={questionnaire.id}
                    className={(expirationDate?.valueOf() < new Date().valueOf() || alreadyAnswered)
                      && styles.container}>
                    <p>{expirationDate
                      ? `Deadline at ${expirationDate.toUTCString()}`
                      : 'No deadline for this request'}</p>
                    {questionnaire.title && <h4>{questionnaire.title}</h4>}
                    {questionnaire.description && <p>{questionnaire.description}</p>}
                    {questionnaire.companyName && <p><b>{questionnaire.companyName}</b></p>}
                    {(expirationDate?.valueOf() > new Date().valueOf() || !expirationDate)
                      ? !alreadyAnswered ? <UIButton title="Answer"
                        onClick={() => handleAnswerClick(requestId, questionnaire.id)} />
                        : <p>Your answer has been accepted!</p>
                      : <p>Expired {new Date(new Date().valueOf()
                        - expirationDate?.valueOf()).getHours()} hours ago</p>}
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
                  <UIButton title="Details" />
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
    );
  };

const MapStateToProps = (state: IAppState) => ({
  questionnaireList: state.questionnaireResponse.list,
  isLoading: state.questionnaireResponse.isLoading,
  user: state.user.shortInfo
});

const MapDispatchToProps = {
  loadQuestionnaires: loadRequestedQuestionnairesRoutine,
  getResponse: getResponseRoutine
};

export default connect(MapStateToProps, MapDispatchToProps)(MainPage);
