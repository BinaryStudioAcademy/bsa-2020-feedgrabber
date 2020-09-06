import React, {FC, useEffect, useState} from 'react';
import UIPageTitle from "../UI/UIPageTitle";
import UIButton from "../UI/UIButton";
import UICard from "../UI/UICard";
import UIContent from "../UI/UIContent";
import UICardBlock from "../UI/UICardBlock";
import UIColumn from "../UI/UIColumn";
import {IAppState} from 'models/IAppState';
import {connect} from "react-redux";
import {loadRequestedQuestionnairesRoutine} from 'sagas/request/routines';
import {loadReportsRoutine} from 'sagas/report/routines';
import LoaderWrapper from 'components/LoaderWrapper';
import {history} from '../../helpers/history.helper';
import {IQuestionnaireResponse} from 'models/forms/Response/types';
import {IReportShort} from 'models/report/IReport';
import {Tab} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import NewsList from 'components/NewsList';

interface IItem {
    id: string;
    header?: string;
    content?: string;
    author?: string;
}

interface IMainPageProps {
    questionnaireList: IQuestionnaireResponse[];
    reportsList?: IReportShort[];
    isLoading: boolean;

    loadQuestionnaires(): void;
    loadReports(): void;

    getResponse(requestId: string): void;
}

const MainPage: FC<IMainPageProps> =
    ({
         questionnaireList,
         reportsList = [],
         isLoading,
         loadQuestionnaires,
         loadReports
     }) => {
        const [t] = useTranslation();
        const [panes, setPanes] = useState([] as { menuItem?: any; render?: () => React.ReactNode }[]);

        const handleAnswerClick = requestId => {
            history.push(`/response/${requestId}`);
        };

        const handleModifyAnswerClick = (requestId, responseId) => {
            history.push(`/response/${requestId}/modify/${responseId}/`);
        };

        useEffect(() => {
            loadQuestionnaires();
        }, [loadQuestionnaires]);

       useEffect(() => {
            loadReports();
       }, [loadReports]);

        useEffect(() => {
            setPanes([
                {
                    menuItem: {key: 'opened', icon: 'eye', content: t('Pending')},
                    render: () => <Tab.Pane loading={isLoading}
                                            style={{border: 'none', paddingTop: 0}}>
                        <LoaderWrapper loading={isLoading}>
                            {questionnaireList?.filter(r => (!r.closeDate &&
                                !r.answeredAt &&
                                (r.expirationDate?.valueOf() || Number.MAX_VALUE) > Date.now().valueOf())).map(
                                (
                                    {
                                        requestId,
                                        questionnaire,
                                        expirationDate
                                    }) => (
                                    <UICardBlock key={requestId}>
                                        <p>{expirationDate
                                            ? `${t("Deadline at")} ${expirationDate.toUTCString()}`
                                            : t('No deadline for this request')}</p>
                                        {questionnaire.title && <h4>{questionnaire.title}</h4>}
                                        {questionnaire.description && <p>{questionnaire.description}</p>}
                                        {questionnaire.companyName && <p><b>{questionnaire.companyName}</b></p>}
                                        {((expirationDate?.valueOf() || Number.MAX_VALUE)
                                            > new Date().valueOf() || !expirationDate)
                                            ? <UIButton title={t("Answer")}
                                                        primary
                                                        onClick={() =>
                                                            handleAnswerClick(requestId)}/>
                                            : <p>{t("Expired")} {new Date(new Date().valueOf()
                                                - expirationDate?.valueOf()).getHours()} {t("hours ago")}</p>}
                                    </UICardBlock>
                                ))}
                        </LoaderWrapper>
                    </Tab.Pane>
                },
                {
                    menuItem: {key: 'closed', icon: 'lock', content: t('Closed')},
                    render: () => <Tab.Pane style={{border: 'none', paddingTop: 0}}>
                        <LoaderWrapper loading={isLoading}>
                            {questionnaireList?.filter(r => r.closeDate ||
                                r.answeredAt ||
                                (r.expirationDate?.valueOf() || Number.MAX_VALUE) <= Date.now().valueOf()).map(
                                (
                                    {
                                        requestId,
                                        responseId,
                                        questionnaire,
                                        expirationDate,
                                        closeDate,
                                        changeable
                                    }) => (
                                    <UICardBlock key={requestId}>
                                        <p>{expirationDate
                                            ? `${t("Deadline at")} ${expirationDate.toUTCString()}`
                                            : t('No deadline for this request')}</p>
                                        {questionnaire.title && <h4>{questionnaire.title}</h4>}
                                        {questionnaire.description && <p>{questionnaire.description}</p>}
                                        {questionnaire.companyName && <p><b>{questionnaire.companyName}</b></p>}
                                        {((expirationDate?.valueOf() || Number.MAX_VALUE)
                                            > new Date().valueOf() && !closeDate)
                                            ? <UIButton
                                                primary
                                                title={changeable ? t("Change my answer") : t("Show answers")}
                                                onClick={() =>
                                                    handleModifyAnswerClick(
                                                        requestId,
                                                        responseId)}/>
                                            : (closeDate && new Date(closeDate).valueOf() !== expirationDate?.valueOf())
                                                ? <p>{t("Force closed on")} {new Date(closeDate).toUTCString()}</p>
                                                : <p>{t("Expired")} {new Date(new Date().valueOf()
                                                    - expirationDate?.valueOf()).getHours()} {t("hours ago")}</p>}
                                    </UICardBlock>
                                ))}
                        </LoaderWrapper>
                    </Tab.Pane>
                }
            ]);
            // eslint-disable-next-line
        }, [isLoading, questionnaireList]);

        return (
            <>
                <UIPageTitle title={t("Home")}/>
                <UIContent>
                    <UIColumn>
                        <UICard>
                            <UICardBlock>
                                <h3>{t("My Reports")}</h3>
                            </UICardBlock>
                            {reportsList.length === 0 ?
                              <UICardBlock>
                                {t("No reports for now, we'll notify you")}
                              </UICardBlock> :
                              reportsList.map(item => (
                                <UICardBlock key={item.id}>
                                    {item.title && <h4>{item.title}</h4>}
                                    {item.closeDate && <p>{item.closeDate}</p>}
                                    {item.author && <p><b>{item.author}</b></p>}
                                    <Link to={`/report/${item.id}`}><UIButton title={t("Details")}/></Link>
                                </UICardBlock>
                              ))}
                        </UICard>
                    </UIColumn>
                    <UIColumn>
                        <UICard>
                            <UICardBlock>
                                <h3>{t("My Requests")}</h3>
                            </UICardBlock>
                            <Tab menu={{secondary: true, pointing: true}} panes={panes}/>
                        </UICard>
                    </UIColumn>
                    <UIColumn wide>
                        <UICard>
                            <UICardBlock>
                                <h3>{t("Company News Feed")}</h3>
                            </UICardBlock>
                            <NewsList/>
                        </UICard>
                    </UIColumn>
                </UIContent>
            </>
        );
    };

const MapStateToProps = (state: IAppState) => ({
    questionnaireList: state.questionnaireResponse.list,
    isLoading: state.questionnaireResponse.isLoading,
    user: state.user.shortInfo,
    reportsList: state.questionnaireReports.reports
});

const MapDispatchToProps = {
    loadQuestionnaires: loadRequestedQuestionnairesRoutine,
    loadReports: loadReportsRoutine
};

export default connect(MapStateToProps, MapDispatchToProps)(MainPage);
