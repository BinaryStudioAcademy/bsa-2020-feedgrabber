import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoaderWrapper from "components/LoaderWrapper";
import Data from "screens/Home/containers/Data";
import PrivateRoute from "../../components/PrivateRoute";
import PublicRoute from "../../components/PublicRoute";

import SideMenu from "../../components/SideMenu";
import {Menu} from "semantic-ui-react";

export interface IRoutingProps {
  isLoading: boolean;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({ isLoading }) => (
  <div>
    <Switch>
      <Route exact path="/public" component={SideMenu} />
      <div>
        <LoaderWrapper loading={isLoading}>
          <Switch>
            <PublicRoute exact path="/login" component={<span>Login page</span>} />
            <PublicRoute exact path="/register" component={<span>Register page</span>} />
            <PrivateRoute exact path="/profile" component={<span>Profile</span>} />
            <PrivateRoute exact path="/profile/settings" component={<span>Profile Settings</span>} />
            <PrivateRoute exact path="/requests" component={<span>Requests</span>} />
            <PrivateRoute exact path="/help" component={<span>Help Center</span>} />
            <PrivateRoute exact path="/editor" component={<span>Form Editor</span>} />
            <PrivateRoute exact path="/assign" component={<span>Assign feedbacks</span>} />
            <PrivateRoute exact path="/pending" component={<span>Pending feedbacks</span>} />
            <PrivateRoute exact path="/company" component={<span>Company dashboard</span>} />
            <Route path="/*">
              <Redirect to="/public" />
            </Route>
          </Switch>
        </LoaderWrapper>
      </div>
    </Switch>
  </div>
);

export default Routing;
