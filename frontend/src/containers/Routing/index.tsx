import React, {FC} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import Landing from "../../components/Landing";
import PrivateRoute from "../../components/PrivateRoute";
import PublicRoute from "../../components/PublicRoute";
import MainPage from "../../components/MainPage";
import SignForm from "../../components/AuthForm/SignForm";
import {Profile, ProfileX} from "../../components/Profile";
import QuestionsList from "../QuestionsList";
import QuestionDetails from "../QuestionDetails";
import TeamsPage from "../TeamsPage";
import QuestionnaireList from "../QuestionnaireList";
import ExpandedQuestionnaire from "../ExpandedQuestionnaire";
import {IAppState} from "../../models/IAppState";
import {connect} from "react-redux";
import QuestionnairePreview from 'components/QuestionnairePreview';
import UserList from "../UserList";
import ResetPasswordForm from "../../components/AuthForm/ResetPasswordForm";

export interface IRoutingProps {
  isLoading: boolean;
}

const Routing: FC<IRoutingProps> = ({ isLoading }) => (
  <>
      <LoaderWrapper loading={isLoading}>
        <Switch>
          <PublicRoute exact path="/layout" component={Landing} />
          <PublicRoute exact path="/auth" component={SignForm} />
          <PublicRoute exact path="/reset/:id" component={ResetPasswordForm} />
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
          <PrivateRoute exact path="/questionnaires/:id/preview" component={QuestionnairePreview} />
          <PrivateRoute exact path="/questions" component={QuestionsList} />
          <PrivateRoute exact path="/question/:id" component={QuestionDetails} />
           <PrivateRoute exact path="/employees" component={UserList} />
          <Route path="/*">
            <Redirect to="/layout" />
          </Route>
        </Switch>
      </LoaderWrapper>
  </>
);

const mapState = (state: IAppState) => ({
    isLoading: state.isLoading
});

export default connect(mapState)(Routing);
