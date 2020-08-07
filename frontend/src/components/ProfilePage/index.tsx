import React, {FunctionComponent} from 'react';
import {Grid, Menu} from "semantic-ui-react";
import './styles.sass';
import {NavLink} from 'react-router-dom';
import PrivateRoute from "../PrivateRoute";
import ProfileInfo from "../ProfileInfo";
import ProfileSettings from "../ProfileSettings";
const ProfilePage: FunctionComponent =
    () => {

        return (
                <div className={"profile-container"}>

                    <Grid>
                        <Grid.Column width={4}>
                                <Menu fluid vertical tabular>
                                    <Menu.Item exact as={NavLink} to='/profile' name={'profile'}/>
                                    <Menu.Item exact as={NavLink} to='/profile/settings' name={'settings'}/>
                                </Menu>
                        </Grid.Column>

                        <Grid.Column stretched width={12}>
                                <PrivateRoute exact path="/profile" component={ProfileInfo}/>
                                <PrivateRoute exact path="/profile/settings" component={ProfileSettings}/>
                        </Grid.Column>
                    </Grid>
                </div>
        );
    };

export default ProfilePage;