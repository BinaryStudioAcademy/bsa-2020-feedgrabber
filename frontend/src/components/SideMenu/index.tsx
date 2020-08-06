import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const SideMenu = () => {
    const history = useHistory();
    return (
        <Menu vertical>
            <Menu.Item onClick={() => history.push('/company')}>
                <Icon name="th"/>
                Company dashboard
            </Menu.Item>
            <Menu.Item onClick={() => history.push('/editor')}>
                <Icon name="edit"/>
                Form editor
            </Menu.Item>
            <Menu.Item onClick={() => history.push('/pending')}>
                <Icon name="clock outline"/>
                Pending feedbacks
            </Menu.Item>
            <Menu.Item onClick={() => history.push('/assign')}>
                <Icon name="bookmark"/>
                Assign feedbacks
            </Menu.Item>
        </Menu>
    );
};

export default SideMenu;