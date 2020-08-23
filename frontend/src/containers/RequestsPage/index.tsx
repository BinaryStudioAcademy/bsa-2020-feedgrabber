import React, {FC, useEffect} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {loadQuestionnaireRequestsRoutine} from "../../sagas/questionnaireReport/routines";
import UICard from "../../components/UI/UICard";
import UIContent from "../../components/UI/UIContent";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UICardBlock from "../../components/UI/UICardBlock";
import {history} from "../../helpers/history.helper";

const RequestsPage: FC<RequestPageProps & { match }> = (
    {loadRequests, match, requests}) => {

    useEffect(() => {
        loadRequests(match.params.id);
    }, [loadRequests, match.params.id]);

    function handleClick(id: string) {
        history.push(`/report/${id}`);
    }

    return (
        <>
            <UIPageTitle title="Requests"/>
            <UIContent>
                <UICard>
                {
                    requests.map(r => (
                        <UICardBlock key={r.requestId} onClick={() => handleClick(r.requestId)}>
                            <h3>Made by {r.requestMaker.username}</h3>
                            <h4>Created at {r.creationDate.substr(0, 19)}</h4>
                            <h5>{r.generateReport && "Report will be generated automatic"}</h5>
                        </UICardBlock>
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
