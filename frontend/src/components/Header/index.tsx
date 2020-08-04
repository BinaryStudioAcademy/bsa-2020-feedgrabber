import React from "react";
import { Menu, Icon, Image, Header as HeaderUI, Button, Dropdown } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';

import styles from './styles.module.scss';

const Header = ({ user }) => {
    const history = useHistory();
    return (
        <Menu secondary>
            <Menu.Item onClick={() => history.push('/')}>
                <HeaderUI>
                    <Image circular src="https://img.icons8.com/cotton/64/000000/chat.png" />
                    {' '}
                    <span>Feedgrabber</span>
                </HeaderUI>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item name="horizontally" fitted="horizontally">
                    <Button basic icon type="button" className={`${styles.menuBtn} ${styles.logoutBtn}`}>
                        <Icon name="bell" size="large" />
                    </Button>
                </Menu.Item>
                <Menu.Item name="horizontally" fitted="horizontally">
                    <Dropdown
                        icon={null}
                        pointing='top right'
                        trigger={<Image avatar
                                        src="https://img.icons8.com/cotton/64/000000/chat.png"
                                        className={styles.headerUserDropDown}/>}
                                        size="medium">
                        <Dropdown.Menu>
                            <Dropdown.Item>User</Dropdown.Item>
                            <Dropdown.Item>Profile</Dropdown.Item>
                            <Dropdown.Item>Setting</Dropdown.Item>
                            <Dropdown.Item>Forms</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item name="horizontally" fitted="horizontally">
                    <Button basic icon type="button" className={`${styles.menuBtn} ${styles.logoutBtn}`}>
                        <Icon name="log out" size="large" />
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;