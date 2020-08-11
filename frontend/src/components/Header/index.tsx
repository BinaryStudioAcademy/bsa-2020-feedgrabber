import React, {FC} from "react";
import {Menu, Icon, Image, Header as HeaderUI, Button, Dropdown} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import styles from "./styles.module.scss";
import icon from "../../assets/images/icon_bg.jpg";
import {logoutRoutine} from "../AuthForm/routines";
import {connect, useDispatch} from "react-redux";
import {AnyAction, bindActionCreators, Dispatch} from "redux";

export interface IUser {
    id: string;
    username: string;
    avatar: string;
}

export interface IHeaderProps {
    user: IUser;
    logout: () => void;
    showMenu: boolean;
}

const Header: FC<IHeaderProps> = ({user, logout, showMenu}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <Menu secondary borderless className={styles.main_header}>
            <Menu.Item onClick={() => history.push('/')}>
                <HeaderUI>
                    <Image src={icon}/>
                    {' '}
                    <span>Feedgrabber</span>
                </HeaderUI>
            </Menu.Item>
            <Menu.Item onClick={() => dispatch({type: 'TOGGLE_MENU'})}>
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
                                        src={user.avatar}
                                        className={styles.headerUserDropDown}/>}
                        size="medium">
                        <Dropdown.Menu>
                            <Dropdown.Header>{user.username}</Dropdown.Header>
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

Header.defaultProps = {
    user: {
        id: '',
        username: "UserName",
        avatar: "https://img.icons8.com/cotton/64/000000/chat.png"
    }
};

const mapStateToProps = state => ({
    // user: state.profile.user
    showMenu: state.app.showMenu
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
    bindActionCreators(
        {
            logout: logoutRoutine
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
