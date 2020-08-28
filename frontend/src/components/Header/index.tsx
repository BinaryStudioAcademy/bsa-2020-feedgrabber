import React, {FC, useState} from "react";
import {Image} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {history} from "../../helpers/history.helper";
import styles from "./styles.module.sass";
import icon from "../../assets/images/logo.svg";
import {logoutRoutine} from "../../sagas/auth/routines";
import {connect, ConnectedProps} from "react-redux";
import {IAppState} from "../../models/IAppState";
import NotificationMenu from "../NotificationMenu";
import {toggleMenuRoutine} from "../../sagas/app/routines";
import {Menu, MenuItem} from "@material-ui/core";

const defaultAvatar =
    "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const Header: FC<Props> = ({user, logout, toggleMenu, isEditing}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = e => setAnchorEl(e.currentTarget);

    const close = (func: any) => e => {
        setAnchorEl(null);
        func();
    };

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.headerContent}>
                <div className={styles.headerPart}>
                    <div className={styles.headerTitle}>
                        <img onClick={toggleMenu} alt="FeedGrabber" className={styles.headerLogo} src={icon}/>
                        <h1 className={styles.headerServiceName} onClick={() => history.push('/')}>FeedGrabber</h1>
                    </div>
                    <NavLink exact to="/pending" activeClassName={styles.headerMenuItemActive}
                             className={styles.headerMenuItem}>
                        PENDING FEEDBACKS
                    </NavLink>
                    <NavLink exact to="/editor"
                             className={`${styles.headerMenuItem} ${isEditing && styles.headerMenuItemActive}`}>
                        FORM EDITOR
                    </NavLink>
                    <a className={styles.headerMenuItem}>
                        ASSIGN FEEDBACKS
                    </a>
                </div>
                <div className={styles.headerPart}>
                    <div className={styles.headerBellWrapper}>
                        <NotificationMenu/>
                    </div>
                    <Menu
                        title={user.userName}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={close(() => history.push('/profile'))}>Profile</MenuItem>
                        <MenuItem onClick={close(() => history.push('/profile/settings'))}>Settings</MenuItem>
                        <MenuItem onClick={close(() => history.push('/requests'))}>Request</MenuItem>
                        <MenuItem onClick={close(() => logout())}>Log out</MenuItem>
                    </Menu>
                    <Image onClick={handleClick} avatar src={user?.avatar ?? defaultAvatar}
                           className={styles.headerAvatar}/>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IAppState) => ({
    user: state.user.info,
    isEditing: !!state.questionnaires.current.get.id
});
const mapDispatchToProps = {
    logout: logoutRoutine,
    toggleMenu: toggleMenuRoutine
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
export default connector(Header);
