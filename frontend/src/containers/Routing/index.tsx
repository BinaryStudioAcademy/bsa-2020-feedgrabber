import React, {FC, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import Landing from "../../components/Landing";
import PrivateRoute from "../../components/PrivateRoute";
import MainPage from "../../components/MainPage";
import SignForm from "../../components/AuthForm/SignForm";
import {Profile, ProfileX} from "../../components/Profile";
import QuestionsList from "../QuestionsList";
import TeamsPage from "../TeamsPage";
import QuestionnaireList from "../QuestionnaireList";
import ExpandedQuestionnaire from "../ExpandedQuestionnaire";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {getUserRoutine} from "../../sagas/auth/routines";
import {useAuth} from '../../security/authProvider';
import GuestRoute from "../../components/GuestRoute";
import AccountVerificationPage from "../../components/AccountVerificationPage";
import InvitationSignUp from "../InvitationSignUp";
import UserList from "../UserList";
import ResetPasswordForm from "../../components/AuthForm/ResetPasswordForm";
import QuestionDetailsPage from "../QuestionDeatilsPage";
import QuestionnaireResponse from 'containers/QuestionnareResponse';
import RequestCreation from "../RequestCreation";
import QuestionnairePreview from "../../components/QuestionnairePreview";
import TeamDetailsPage from "../TeamsDetailsPage";
import ReportPage from "../ReportPage";
import RequestsPage from "../RequestsPage";
import InvitationLinkPage from "../InvitationLinkPage";
import RespondentReport from "../ReportPage/RespondentReport";

const Routing: FC<RoutingProps> = ({isLoading, getUser}) => {
    const isLogged = useAuth();

    useEffect(() => {
        isLogged && getUser();
    }, [isLogged, getUser]);

    return (
        <>
            <LoaderWrapper loading={isLoading}>
                <Switch>
                    <GuestRoute exact path="/layout" component={Landing}/>
                    <GuestRoute exact path="/auth" component={SignForm}/>
                    <GuestRoute exact path="/sign-up/:id" component={InvitationSignUp}/>
                    <GuestRoute exact path="/reset/:id" component={ResetPasswordForm}/>
                    <Route exact path="/verify-registration/:id" component={AccountVerificationPage}/>
                    <PrivateRoute exact path="/" component={MainPage}/>
                    <PrivateRoute exact path="/profile" component={Profile}/>
                    <PrivateRoute exact path="/profile/settings" component={ProfileX}/>
                    <PrivateRoute exact path="/requests" component={() => <span>Requests</span>}/>
                    <PrivateRoute exact path="/help" component={() => <span>Help Center</span>}/>
                    <PrivateRoute exact path="/editor" component={() => <span>Form Editor</span>}/>
                    <PrivateRoute exact path="/assign" component={() => <span>Assign feedbacks</span>}/>
                    <PrivateRoute exact path="/pending" component={() => <span>Pending feedbacks</span>}/>
                    <PrivateRoute exact path="/company" component={() => <span>Company Dashboard</span>}/>
                    <PrivateRoute exact path="/teams" component={TeamsPage}/>
                    <PrivateRoute exact path="/teams/:id" component={TeamDetailsPage}/>
                    <PrivateRoute exact path="/questionnaires" component={QuestionnaireList}/>
                    <PrivateRoute exact path="/questionnaires/:id" component={ExpandedQuestionnaire}/>
                    <PrivateRoute exact path="/questionnaires/:id/preview" component={QuestionnairePreview}/>
                    <PrivateRoute exact path="/questionnaires/:id/new-request" component={RequestCreation}/>
                    <PrivateRoute exact path="/questionnaires/:id/requests" component={RequestsPage}/>
                    <PrivateRoute exact path="/report/:id" component={ReportPage}/>
                    <PrivateRoute exact path="/report/:id/:respondent/:username" component={RespondentReport}/>
                    <PrivateRoute exact path={["/response/:id/", "/response/:id/modify/:responseId/"]}
                                  component={QuestionnaireResponse}/>
                    <PrivateRoute exact path="/questions" component={QuestionsList}/>
                    <PrivateRoute exact path="/employees" component={UserList}/>
                    <PrivateRoute exact path="/question/:id" component={QuestionDetailsPage}/>
                    <PrivateRoute exact path="/invitations" component={InvitationLinkPage}/>
                    <Route path="/*">
                        <Redirect to="/layout"/>
                    </Route>
                </Switch>
            </LoaderWrapper>
        </>
    );
};

const mapState = (state: IAppState) => ({
    isLoading: state.isLoading
});

const mapDispatch = {
    getUser: getUserRoutine
};

const connector = connect(mapState, mapDispatch);

type RoutingProps = ConnectedProps<typeof connector>;

export default connector(Routing);
