import React, { FC, useEffect, useState } from "react";
import { IAppState } from "../../models/IAppState";
import { connect, ConnectedProps } from "react-redux";
import { loadQuestionnaireRequestsRoutine } from "../../sagas/report/routines";
import UICard from "../../components/UI/UICard";
import UIContent from "../../components/UI/UIContent";
import UIPageTitle from "../../components/UI/UIPageTitle";
import { RequestItem } from "./RequestItem";
import { Tab } from "semantic-ui-react";
import { IRequestShort } from "models/report/IReport";

const RequestsPage: FC<RequestPageProps & { match }> = (
    { loadRequests, match, requests }) => {

    const [open, setOpen] = useState([] as IRequestShort[]);
    const [closed, setClosed] = useState([] as IRequestShort[]);

    useEffect(() => {
        loadRequests(match.params.id);
    }, [loadRequests, match.params.id]);

    useEffect(() => {
        setOpen(requests.filter(r => !r.isClosed));
        setClosed(requests.filter(r => r.isClosed));
    }, [requests]);

    const panes = [
        {
            menuItem: 'Pending requests',
            render: () => <Tab.Pane attached={false}>{open.map(r => (
                <RequestItem request={r} />
            ))}</Tab.Pane>
        },
        {
            menuItem: 'Expired requests',
            render: () => <Tab.Pane attached={false}>{closed.map(r => (
                <RequestItem request={r} />
            ))}</Tab.Pane>
        }
    ];

    return (
        <>
            <UIPageTitle title="Requests" />
            <UIContent>
                <UICard>
                    {
                        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                    }
                </UICard>
            </UIContent>
        </>
    );
};

const mapState = (state: IAppState) => ({
    requests: state.questionnaireReports.list
});
const mapDispatch = {
    loadRequests: loadQuestionnaireRequestsRoutine
};
const connector = connect(mapState, mapDispatch);
type RequestPageProps = ConnectedProps<typeof connector>;
export default connector(RequestsPage);
