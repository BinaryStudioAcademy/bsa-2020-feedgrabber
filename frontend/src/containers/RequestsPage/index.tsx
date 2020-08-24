import React, { FC, useEffect, useState } from "react";
import { IAppState } from "../../models/IAppState";
import { connect, ConnectedProps } from "react-redux";
import { loadQuestionnaireRequestsRoutine } from "../../sagas/report/routines";
import UICard from "../../components/UI/UICard";
import UIContent from "../../components/UI/UIContent";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UICardBlock from "../../components/UI/UICardBlock";
import { history } from "../../helpers/history.helper";
import { toastr } from 'react-redux-toastr';
import { RequestItem } from "./RequestItem";
import { Tab } from "semantic-ui-react";
import { IRequestShort } from "models/report/IReport";

const RequestsPage: FC<RequestPageProps & { match }> = (
    { loadRequests, match, requests }) => {

    const [divided, setDivided] = useState(
        {
            closed: [] as IRequestShort[],
            open: [] as IRequestShort[]
        });

    useEffect(() => {
        loadRequests(match.params.id);
    }, [loadRequests, match.params.id]);

    useEffect(() => {
        setDivided({ closed: [], open: [] });
        requests.map(r => {
            if (!r.isClosed) {
                setDivided({ open: [...divided.open, r], closed: divided.closed });
            } else {
                setDivided({ open: divided.open, closed: [...divided.closed, r] });
            }
        });
    }, [requests]);

    const panes = [
        {
            menuItem: 'Pending requests',
            render: () => <Tab.Pane attached={false}>{divided.open.map(r => (
                <RequestItem request={r} />
            ))}</Tab.Pane>
        },
        {
            menuItem: 'Expired requests',
            render: () => <Tab.Pane attached={false}>{divided.closed.map(r => (
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
