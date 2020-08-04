import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoaderWrapper from "components/LoaderWrapper";
import Data from "screens/Home/containers/Data";
import SignInBox from "containers/SignInBox";

export interface IRoutingProps {
  isLoading: boolean;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({ isLoading }) => (
  <div>
    <Switch>
      <Route exact path="/public" component={Data} />
      <Route exact path="/login" component={SignInBox} />
      <div>
        <LoaderWrapper loading={isLoading}>
          <Switch>
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
