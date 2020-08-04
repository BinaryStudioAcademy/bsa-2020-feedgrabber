import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const SideMenu = () => {
    const history = useHistory();
    const handleCompanyDashboardClick = () => {
        history.push('/company');
    }
    const handleFormEditorClick = () => {
        history.push('/editor');
    }
    const handlePendingClick = () => {
        history.push('/pending');
    }
    const handleAssignClick = () => {
        history.push('/assign');
    }
    return (
        <Menu vertical>
            <Menu.Item onClick={handleCompanyDashboardClick}>
                <Icon name="th"/>
                Company dashboard
            </Menu.Item>
            <Menu.Item onClick={handleFormEditorClick}>
                <Icon name="edit"/>
                Form editor
            </Menu.Item>
            <Menu.Item onClick={handlePendingClick}>
                <Icon name="clock outline"/>
                Pending feedbacks
            </Menu.Item>
            <Menu.Item onClick={handleAssignClick}>
                <Icon name="bookmark"/>
                Assign feedbacks
            </Menu.Item>
        </Menu>
    );
};

export default SideMenu;