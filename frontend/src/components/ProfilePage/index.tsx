import React, { FC } from 'react';
import { Grid, Menu } from "semantic-ui-react";
import './styles.sass';
import { NavLink } from 'react-router-dom';
import ProfileInfo from "../ProfileInfo";
import ProfileSettings from "../ProfileSettings";
import { connect } from 'react-redux';
import { getUserRoutine } from 'components/ProfileInfo/routines';
import { IUserInfo } from 'models/user/types';

interface IProfileMode { mode: 'profile' | 'settings'; profile?: IUserInfo; isLoading?: boolean; pullUser?: () => void }

const ProfilePage: FC<IProfileMode> =
    ({ mode, profile, isLoading, pullUser }) => {

        return (
            <div className={"profile-container"}>

                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            <Menu.Item exact as={NavLink} to='/profile' name={'profile'} />
                            <Menu.Item exact as={NavLink} to='/profile/settings' name={'settings'} />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={12}>
                        {mode === 'profile' ?
                            <ProfileInfo save={undefined} profile={profile}isLoading={isLoading} pullUser={pullUser}/>
                            :
                            <ProfileSettings settings={undefined} />
                        }
                    </Grid.Column>
                </Grid>
            </div>
        );
    };

export const Profile = () => <ProfilePage mode="profile" />;

export const ProfileX = () => <ProfilePage mode="settings" />;

const mapStateToProps = rootState => ({
    profile: rootState.user.data,
    isLoading: rootState.user.isLoading
});

const mapDispatchToProps = {
    pullUser: getUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
