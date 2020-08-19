import React, {FC} from 'react';
import {Grid, Menu} from "semantic-ui-react";
import './styles.sass';
import {NavLink} from 'react-router-dom';
import ProfileInfo from "./ProfileInfo";
import ProfileSettings from "./ProfileSettings";
import Avatar from "./AvatarSettings";

type IProfileMode = { mode: 'profile' | 'settings' | 'set avatar' }

const ProfilePage: FC<IProfileMode> =
    ({mode}) => {
        const getPage = (key: string) => {
            switch (key) {
                case 'profile' :
                    return <ProfileInfo/>;
                case 'set avatar' :
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                    return <Avatar save={() => {}} />;
                default:
                    return <ProfileSettings settings={undefined}/>;
            }
        };

        return (
            <div className={"profile-container"}>

                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            <Menu.Item exact as={NavLink} to='/profile' name={'profile'}/>
                            <Menu.Item exact as={NavLink} to='/profile/settings' name={'settings'}/>
                            <Menu.Item exact as={NavLink} to='/profile/avatar' name={'set avatar'}/>
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={12}>
                        {getPage(mode)}
                    </Grid.Column>
                </Grid>
            </div>
        );
    };

export const Profile = () => <ProfilePage mode="profile"/>;

export const ProfileX = () => <ProfilePage mode="settings"/>;

export const AvatarSettings = () => <ProfilePage mode={'set avatar'}/>;