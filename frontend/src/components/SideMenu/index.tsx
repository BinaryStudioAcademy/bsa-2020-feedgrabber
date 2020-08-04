import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const SideMenu = () => (
    <Menu vertical>
        <Menu.Item>
            <Icon name="th"/>
            Company dashboard
        </Menu.Item>
        <Menu.Item>
            <Icon name="edit"/>
            Form editor
        </Menu.Item>
        <Menu.Item>
            <Icon name="clock outline"/>
            Pending feedbacks
        </Menu.Item>
        <Menu.Item>
            <Icon name="bookmark"/>
            Assign feedbacks
        </Menu.Item>
    </Menu>
);

export default SideMenu;