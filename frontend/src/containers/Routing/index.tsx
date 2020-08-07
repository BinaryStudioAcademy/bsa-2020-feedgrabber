import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import Landing from "../../components/Landing";
import Login from "../../containers/SignInBox";
import Header from "../../components/Header";

import PrivateRoute from "../../components/PrivateRoute";
import PublicRoute from "../../components/PublicRoute";
import MainPage from "../../components/MainPage";
import SignForm from "../../components/sign-form/SignForm";
import ProfilePage from "../../components/ProfilePage";

export interface IRoutingProps {
  isLoading: boolean;
}

// temporary fake value
const isAuthorized = true;

const fakeUser = {
  id: "",
  username: "user",
  avatar: "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png"
};

const Routing: React.FunctionComponent<IRoutingProps> = ({ isLoading }) => (
  <div>
    {isAuthorized && (
      <header>
        <Header user={fakeUser}/>
      </header>
    )}
    <main>
      <LoaderWrapper loading={isLoading}>
        <Switch>
            <Route exact path="/" component={SignForm}/>
          <Route exact path="/layout" component={Landing} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={() => <span>Register page</span>} />
          <PrivateRoute exact path="/" component={MainPage} />
          <PrivateRoute path="/profile" component={ProfilePage} />
          <PrivateRoute exact path="/requests" component={() => <span>Requests</span>} />
          <PrivateRoute exact path="/help" component={() => <span>Help Center</span>} />
          <PrivateRoute exact path="/editor" component={() => <span>Form Editor</span>} />
          <PrivateRoute exact path="/assign" component={() => <span>Assign feedbacks</span>} />
          <PrivateRoute exact path="/pending" component={() => <span>Pending feedbacks</span>} />
          <PrivateRoute exact path="/company" component={() => <span>Company Dashboard</span>} />
          <PrivateRoute exact path="/teams" component={() => <span>Company Dashboard</span>} />
          <PrivateRoute exact path="/questionnaires" component={() => <span>Company Dashboard</span>} />
          <PrivateRoute exact path="/questionnaire/:id" component={() => <span>Company Dashboard</span>} />
          <PrivateRoute exact path="/question/:id" component={() => <span>Company Dashboard</span>} />
          <Route path="/*">
            <Redirect to="/layout" />
          </Route>
        </Switch>
      </LoaderWrapper>
    </main>
  </div>
);

export default Routing;
