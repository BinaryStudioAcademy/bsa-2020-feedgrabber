import React, {FC, useEffect, useState} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {loadQuestionnaireRequestsRoutine} from "../../sagas/report/routines";
import {RequestItem} from "./RequestItem";
import {Card, Container, Header, Tab} from "semantic-ui-react";
import {IRequestShort} from "models/report/IReport";

const RequestsPage: FC<RequestPageProps & { match }> = (
    {loadRequests, match, requests, isLoading}) => {

    const [open, setOpen] = useState([] as IRequestShort[]);
    const [closed, setClosed] = useState([] as IRequestShort[]);

    useEffect(() => {
        loadRequests(match.params.id);
    }, [loadRequests, match.params.id]);

    useEffect(() => {
        setOpen(requests.filter(r => !r.closeDate));
        setClosed(requests.filter(r => r.closeDate));
    }, [requests]);

    const panes = [
        {
            menuItem: {key: 'opened', icon: 'eye', content: 'Opened requests'},
            render: () => <Tab.Pane loading={isLoading}>
                <Card.Group itemsPerRow={2}>
                    {open.map(r => (
                        <RequestItem key={r.requestId} request={r}/>))}
                </Card.Group>
            </Tab.Pane>
        },
        {
            menuItem: {key: 'closed', icon: 'lock', content: 'Closed requests'},
            render: () => <Tab.Pane>
                <Card.Group itemsPerRow={2}>
                    {closed.map(r => (
                        <RequestItem key={r.requestId} request={r}/>))}
                </Card.Group>
            </Tab.Pane>
        }
    ];

    return (
        <Container textAlign="center" style={{width: "70%"}}>
            <Header as='h1' dividing style={{padding: 20}}>
                <Header.Content>
                    Track pending/closed requests
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
    loadRequests: loadQuestionnaireRequestsRoutine
};
const connector = connect(mapState, mapDispatch);
type RequestPageProps = ConnectedProps<typeof connector>;
export default connector(RequestsPage);
