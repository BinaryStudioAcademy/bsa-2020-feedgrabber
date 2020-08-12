import React from 'react';
import {Menu} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import "./styles.sass";

const SideMenu = () => {
    return (
        <Menu vertical pointing secondary>
            <Menu.Item as={NavLink} exact  to="/">
                Home
            </Menu.Item>
            <Menu.Item as={NavLink} to="/company">
                Company dashboard
            </Menu.Item>
            <Menu.Item as={NavLink} to="/questionnaires">
                Questionnaires
            </Menu.Item>
            <Menu.Item as={NavLink} to="/teams">
                Teams
            </Menu.Item>
            <Menu.Item as={NavLink} to="/questions">
                Questions
            </Menu.Item>
        </Menu>
    );
};

export default SideMenu;
