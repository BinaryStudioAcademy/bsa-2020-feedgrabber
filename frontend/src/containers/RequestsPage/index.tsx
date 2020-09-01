import React, {FC, useEffect, useState} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {loadQuestionnaireRequestsRoutine} from "../../sagas/report/routines";
import {RequestItem} from "./RequestItem";
import {Card, Container, Header, Tab} from "semantic-ui-react";
import {IRequestShort} from "models/report/IReport";
import {closeRequestRoutine} from "../../sagas/request/routines";
import { useTranslation } from "react-i18next";

const RequestsPage: FC<RequestPageProps & { match }> = (
    {loadRequests, match, requests, isLoading, closeRequest}) => {

    const [t] = useTranslation();
    const [open, setOpen] = useState([] as IRequestShort[]);
    const [closed, setClosed] = useState([] as IRequestShort[]);
    const qId = match.params.id;

    useEffect(() => {
        loadRequests(qId);
    }, [loadRequests, qId]);

    useEffect(() => {
        setOpen(requests.filter(r => !r.closeDate));
        setClosed(requests.filter(r => r.closeDate));
    }, [requests]);

    const panes = [
        {
            menuItem: {key: 'opened', icon: 'eye', content: t('Opened requests')},
            render: () => <Tab.Pane loading={isLoading}>
                <Card.Group itemsPerRow={2}>
                    {open.map(r => (
                        <RequestItem isClosed={false} closeRequest={closeRequest}
                                     key={r.requestId} request={r} questionnaireId={qId}
                        />))}
                </Card.Group>
            </Tab.Pane>
        },
        {
            menuItem: {key: 'closed', icon: 'lock', content: t('Closed requests')},
            render: () => <Tab.Pane>
                <Card.Group itemsPerRow={2}>
                    {closed.map(r => (
                        <RequestItem isClosed key={r.requestId} request={r}/>))}
                </Card.Group>
            </Tab.Pane>
        }
    ];

    return (
        <Container textAlign="center" style={{width: "70%"}}>
            <Header as='h1' dividing style={{padding: 20}}>
                <Header.Content>
                    {t("Track pending/closed requests")}
                </Header.Content>
            </Header>
            <Tab panes={panes}/>
        </Container>
    );
};

const mapState = (state: IAppState) => ({
    requests: state.questionnaireReports.requests,
    isLoading: state.questionnaireReports.isLoading
});
const mapDispatch = {
    loadRequests: loadQuestionnaireRequestsRoutine,
    closeRequest: closeRequestRoutine
};
const connector = connect(mapState, mapDispatch);
type RequestPageProps = ConnectedProps<typeof connector>;
export default connector(RequestsPage);
