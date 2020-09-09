import React, {FC, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LoaderWrapper from 'components/helpers/LoaderWrapper';
import Landing from "../../components/Landing";
import PrivateRoute from "../../components/helpers/PrivateRoute";
import MainPage from "../../components/MainPage";
import SignForm from "../../components/AuthForm/SignForm";
import QuestionsList from "../QuestionsList";
import QuestionnaireList from "../QuestionnaireList";
import ExpandedQuestionnaire from "../FormEditor";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {getUserRoutine} from "../../sagas/auth/routines";
import {useAuth} from '../../security/authProvider';
import GuestRoute from "../../components/helpers/GuestRoute";
import AccountVerificationPage from "../../components/AccountVerificationPage";
import InvitationSignUp from "../InvitationSignUp";
import UserList from "../UserList";
import ResetPasswordForm from "../../components/AuthForm/ResetPasswordForm";
import QuestionnaireResponse from 'containers/QuestionnareResponse';
import RequestCreation from "../RequestCreation";
import Form from "../../components/Form";
import TeamDetailsPage from "../TeamsDetailsPage";
import ReportPage from "../ReportPage";
import RequestsPage from "../RequestsPage";
import InvitationLinkPage from "../InvitationLinkPage";
import RespondentReport from "../ReportPage/RespondentReport";
import Profile from "../../components/Profile";
import RedirectFormEditor from "../../components/RedirectFormEditor";
import ErrorPage from "../ErrorPage";
import NewsList from "../../components/NewsList";
import SignUpByEmailPage from 'components/SignUpByEmailPage';

import CompanyFeedItemCreation from "../../components/CompanyFeedItemCreation";
import QuestionDetailsContainer from "../QuestionDetailsContainer";
import PeopleManagementPage from "../../components/PeopleManagementPage/PeopleManagementPage";
import ExpandedNewsItem from "../../components/ExpandedNews";

const Routing: FC<RoutingProps> = ({isLoading, getUser}) => {
    const isLogged = useAuth();

    useEffect(() => {
        isLogged && getUser();
    }, [isLogged, getUser]);

    return (
        <>
            <LoaderWrapper loading={isLoading}>
                <Switch>
                    <GuestRoute exact path="/" component={Landing}/>
                    <GuestRoute exact path="/auth" component={SignForm}/>
                    <GuestRoute exact path="/auth/email" component={SignUpByEmailPage}/>
                    <GuestRoute exact path="/sign-up/:id" component={InvitationSignUp}/>
                    <GuestRoute exact path="/reset/:id" component={ResetPasswordForm}/>
                    <Route exact path="/error" render={ props => <ErrorPage {...props}/>}/>
                    <Route exact path="/verify-registration/:id" component={AccountVerificationPage}/>
                    <PrivateRoute exact path="/home" component={MainPage}/>
                    <PrivateRoute exact path="/profile" component={() => <Profile mode='profile'/>}/>
                    <PrivateRoute exact path="/profile/security" component={() => <Profile mode='security'/>}/>
                    <PrivateRoute exact path="/requests" component={() => <span>Requests</span>}/>
                    <PrivateRoute exact path="/help" component={() => <span>Help Center</span>}/>
                    <PrivateRoute exact path="/editor" component={RedirectFormEditor}/>
                    <PrivateRoute exact path="/assign" component={() => <span>Assign feedbacks</span>}/>
                    <PrivateRoute exact path="/pending" component={() => <span>Pending feedbacks</span>}/>
                    <PrivateRoute exact path="/company" component={NewsList}/>
                    <PrivateRoute exact path="/company/:id" component={CompanyFeedItemCreation}/>
                    <PrivateRoute exact path="/company/news/:id" component={ExpandedNewsItem} />
                    <PrivateRoute exact path="/people/:tab" component={PeopleManagementPage}/>
                    <PrivateRoute exact path="/people/teams/:id" component={TeamDetailsPage}/>
                    <PrivateRoute exact path="/questionnaires" component={QuestionnaireList}/>
                    <PrivateRoute exact path="/questionnaires/:id" component={ExpandedQuestionnaire}/>
                    <PrivateRoute exact path="/questionnaires/:id/preview" component={Form}/>
                    <PrivateRoute exact path="/questionnaires/:id/new-request" component={RequestCreation}/>
                    <PrivateRoute exact path="/questionnaires/:id/requests" component={RequestsPage}/>
                    <PrivateRoute exact path="/report/:id" component={ReportPage}/>
                    <PrivateRoute exact path="/report/:id/:respondent/:username" component={RespondentReport}/>
                    <PrivateRoute exact path={["/response/:id/", "/response/:id/modify/:responseId/"]}
                                  component={QuestionnaireResponse}/>
                    <PrivateRoute exact path="/questions" component={QuestionsList}/>
                    <PrivateRoute exact path="/employees" component={UserList}/>
                    <PrivateRoute exact path="/question/:id" component={QuestionDetailsContainer}/>
                    <PrivateRoute exact path="/invitations" component={InvitationLinkPage}/>
                    <Route path="/people">
                        <Redirect to="/people/teams"/>
                    </Route>
                    <Route path="/*">
                        <Redirect to="/"/>
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
