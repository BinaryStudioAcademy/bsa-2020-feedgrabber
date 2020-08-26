import React, {FC, useState} from "react";
import {Icon, Image, Dropdown} from "semantic-ui-react";
import {NavLink, useHistory} from "react-router-dom";
import styles from "./styles.module.sass";
import icon from "../../assets/images/icon_bg.jpg";
import {logoutRoutine} from "../../sagas/auth/routines";
import {connect} from "react-redux";
import {IAppState} from "../../models/IAppState";
import {IUserInfo} from "../../models/user/types";
import NotificationMenu from "../NotificationMenu";
// import {INotification} from "../../reducers/notifications";

export interface IHeaderProps {
  user: IUserInfo;
  logout: () => void;
}

const defaultAvatar =
  "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const Header: FC<IHeaderProps> = ({user, logout}) => {
  const history = useHistory();
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <div className={styles.headerPart}>
          <div className={styles.headerTitle} onClick={() => history.push('/')}>
            <img alt="FeedGrabber" className={styles.headerLogo} src={icon}/>
            <h1 className={styles.headerServiceName}>FeedGrabber</h1>
          </div>
          <NavLink exact to="/pending" activeClassName={styles.headerMenuItemActive} className={styles.headerMenuItem}>
            PENDING FEEDBACKS
          </NavLink>
          <a className={styles.headerMenuItem}>
            FORM EDITOR
          </a>
          <a className={styles.headerMenuItem}>
            ASSIGN FEEDBACKS
          </a>
        </div>
        <div className={styles.headerPart}>
          <div className={styles.headerSearchWrapper}>
            <Icon className={styles.headerSearchIcon} name="search" size="small"/>
            <input className={styles.headerSearch} placeholder="Search"/>
          </div>
          <div className={styles.headerBellWrapper}>
            <NotificationMenu/>
          </div>
          <Image avatar src={user?.avatar ?? defaultAvatar} className={styles.headerAvatar}/>
          <div>
            <Dropdown
              icon={null}
              pointing='top right'
              trigger={<div className={styles.headerMyAccount}>My Account&nbsp;&nbsp;&#x25BE;</div>}
              size="medium">
              <Dropdown.Menu>
                <Dropdown.Header>{user?.userName}</Dropdown.Header>
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
                <Dropdown.Item onClick={logout}>
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
  user: state.user.info
});

const mapDispatchToProps = {
  logout: logoutRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
