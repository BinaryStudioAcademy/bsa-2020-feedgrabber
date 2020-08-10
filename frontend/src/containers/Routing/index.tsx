import React, {FC} from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import Landing from "../../components/Landing";
import PrivateRoute from "../../components/PrivateRoute";
import PublicRoute from "../../components/PublicRoute";
import MainPage from "../../components/MainPage";
import SignForm from "../../components/AuthForm/SignForm";
import {Profile, ProfileX} from "../../components/Profile";
import QuestionsList from "../../components/QuestionsList";
import TeamsList from "../../components/TeamsList";
import QuestionnaireList from "../QuestionnaireList";

export interface IRoutingProps {
  isLoading: boolean;
}

const Routing: FC<IRoutingProps> = ({ isLoading }) => (
  <>
      <LoaderWrapper loading={isLoading}>
        <Switch>
          <PublicRoute exact path="/layout" component={Landing} />
          <PublicRoute exact path="/auth" component={SignForm} />
          <PrivateRoute exact path="/" component={MainPage} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/profile/settings" component={ProfileX} />
          <PrivateRoute exact path="/requests" component={() => <span>Requests</span>} />
          <PrivateRoute exact path="/help" component={() => <span>Help Center</span>} />
          <PrivateRoute exact path="/editor" component={() => <span>Form Editor</span>} />
          <PrivateRoute exact path="/assign" component={() => <span>Assign feedbacks</span>} />
          <PrivateRoute exact path="/pending" component={() => <span>Pending feedbacks</span>} />
          <PrivateRoute exact path="/company" component={() => <span>Company Dashboard</span>} />
          <PrivateRoute exact path="/teams" component={TeamsList} />
          <PrivateRoute exact path="/questionnaires" component={QuestionnaireList} />
          <PrivateRoute exact path="/questionnaire/:id" component={() => <span>Company Dashboard</span>} />
          <PublicRoute exact path="/questions" component={QuestionsList} />
          <PrivateRoute exact path="/question/:id" component={() => <span>Company Dashboard</span>} />
          <Route path="/*">
            <Redirect to="/layout" />
          </Route>
        </Switch>
      </LoaderWrapper>
  </>
);

export default Routing;
