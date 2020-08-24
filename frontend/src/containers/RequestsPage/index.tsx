import React, { FC, useEffect } from "react";
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

const RequestsPage: FC<RequestPageProps & { match }> = (
    { loadRequests, match, requests }) => {

    useEffect(() => {
        loadRequests(match.params.id);
    }, [loadRequests, match.params.id]);

    return (
        <>
            <UIPageTitle title="Requests" />
            <UIContent>
                <UICard>
                    {
                        requests.map(r => (
                            <RequestItem request={r} />
                        ))
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
