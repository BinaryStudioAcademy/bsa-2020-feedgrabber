import React, {FC} from "react";
import {Menu, Icon, Image, Header as HeaderUI, Button, Dropdown} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import styles from "./styles.module.scss";
import icon from "../../assets/images/icon_bg.jpg";
import {logoutRoutine} from "../../sagas/auth/routines";
import {connect} from "react-redux";
import {IAppState} from "../../models/IAppState";
import {IUserInfo} from "../../models/user/types";
import {toggleMenuRoutine} from "../../sagas/app/routines";

export interface IHeaderProps {
    user: IUserInfo;
    logout: () => void;
    showMenu: boolean;
    toggleMenu(): void;
}

const defaultAvatar =
    "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const Header: FC<IHeaderProps> = ({user, logout, showMenu, toggleMenu}) => {
    const history = useHistory();
    return (
        <Menu secondary borderless className={styles.main_header}>
            <Menu.Item onClick={() => history.push('/')}>
                <HeaderUI>
                    <Image src={icon}/>
                    {' '}
                    <span>FeedGrabber</span>
                </HeaderUI>
            </Menu.Item>
            <Menu.Item onClick={() => toggleMenu()}>
                <Icon name={showMenu ? "bars" : "options"}/>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item name="horizontally" fitted="horizontally">
                    <Button basic icon type="button" className={`${styles.menuBtn} ${styles.logoutBtn}`}>
                        <Icon name="bell" size="large"/>
                    </Button>
                </Menu.Item>
                <Menu.Item name="horizontally" fitted="horizontally">
                    <Dropdown
                        icon={null}
                        pointing='top right'
                        trigger={<Image avatar
                                        src={user.avatar ?? defaultAvatar}
                                        className={styles.headerUserDropDown}/>}
                        size="medium">
                        <Dropdown.Menu>
                            <Dropdown.Header>{user.userName}</Dropdown.Header>
                            <Dropdown.Item onClick={() => history.push('/profile')}>
                                Your Profile
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => history.push('/requests')}>
                                Your Requests
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => history.push('/profile/settings')}>
                                Your Settings
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => history.push('/help')}>
                                Help Center
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item name="horizontally" fitted="horizontally">
                    <Button basic icon type="button"
                            className={`${styles.menuBtn} ${styles.logoutBtn}`}
                            onClick={logout}>
                        <Icon name="log out" size="large"/>
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

const mapStateToProps = (state: IAppState) => ({
    user: state.user.info,
    showMenu: state.app.showMenu
});

const mapDispatchToProps = {
    logout: logoutRoutine,
    toggleMenu: toggleMenuRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
