import React, {FC} from 'react';
import {Grid, Menu} from "semantic-ui-react";
import './styles.sass';
import {NavLink} from 'react-router-dom';
import ProfileInfo from "../ProfileInfo";
import ProfileSettings from "../ProfileSettings";

type ProfileMode = 'profile' | 'settings';

const ProfilePage: FC<{mode: ProfileMode}> =
    ({mode}) => {

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
                        {mode === 'profile' ?
                            <ProfileInfo save={undefined} profile={undefined} />
                            :
                            <ProfileSettings settings={undefined} />
                        }
                    </Grid.Column>
                </Grid>
            </div>
        );
    };

export const Profile = () => <ProfilePage mode="profile"/>;

export const ProfileX = () => <ProfilePage mode="settings"/>;
