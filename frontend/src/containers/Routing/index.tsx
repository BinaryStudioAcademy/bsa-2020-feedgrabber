import React, {FC, useEffect} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
import {connect} from "react-redux";
import {IUserInfo} from "../../models/user/types";
import {getUserRoutine} from "../../sagas/auth/routines";
import {useAuth} from '../../security/authProvider';
import GuestRoute from "../../components/GuestRoute";
import InvitationSignUp from "../InvitationSignUp";
import UserList from "../UserList";
import ResetPasswordForm from "../../components/AuthForm/ResetPasswordForm";

import QuestionDetailsPage from "../QuestionDeatilsPage";
import QuestionnareResponse from 'containers/QuestionnareResponse';

export interface IRoutingProps {
  isLoading: boolean;
  user?: IUserInfo;

  getUser(): void;
}

const Routing: FC<IRoutingProps> = ({ isLoading, user, getUser }) => {
  const isLogged = useAuth();

  useEffect(() => {
    if (isLogged && !user){
      getUser();
    }
  }, [isLogged, user, getUser]);

  return (
    <>
      <LoaderWrapper loading={isLoading}>
        <Switch>
          <GuestRoute exact path="/layout" component={Landing} />
          <GuestRoute exact path="/auth" component={SignForm} />
          <GuestRoute exact path="/sign-up/:id" component={InvitationSignUp}/>
          <GuestRoute exact path="/reset/:id" component={ResetPasswordForm} />
          <PrivateRoute exact path="/" component={MainPage} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/profile/settings" component={ProfileX} />
          <PrivateRoute exact path="/requests" component={() => <span>Requests</span>} />
          <PrivateRoute exact path="/help" component={() => <span>Help Center</span>} />
          <PrivateRoute exact path="/editor" component={() => <span>Form Editor</span>} />
          <PrivateRoute exact path="/assign" component={() => <span>Assign feedbacks</span>} />
          <PrivateRoute exact path="/pending" component={() => <span>Pending feedbacks</span>} />
          <PrivateRoute exact path="/company" component={() => <span>Company Dashboard</span>} />
          <PrivateRoute exact path="/teams" component={TeamsPage} />
          <PrivateRoute exact path="/questionnaires" component={QuestionnaireList} />
          <PrivateRoute exact path="/questionnaires/:id" component={ExpandedQuestionnaire} />
          <PrivateRoute exact path="/response/:id" component={QuestionnareResponse} />
          <PrivateRoute exact path="/questions" component={QuestionsList} />
          <PrivateRoute exact path="/question/:id" component={QuestionDetailsPage} />
          <PrivateRoute exact path="/employees" component={UserList} />
          <Route path="/*">
            <Redirect to="/layout"/>
          </Route>
        </Switch>
      </LoaderWrapper>
    </>
  );
};

const mapState = (state: IAppState) => ({
  isLoading: state.isLoading,
  user: state.user.info
});

const mapDispatchToProps = {
  getUser: getUserRoutine
};

export default connect(mapState, mapDispatchToProps)(Routing);