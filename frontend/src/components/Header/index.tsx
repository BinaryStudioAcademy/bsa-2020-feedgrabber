import React, {FC} from "react";

import {Image, Menu, Popup} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {history} from "../../helpers/history.helper";
import styles from "./styles.module.sass";
import icon from "../../assets/images/icon_scaled.png";
import {logoutRoutine} from "../../sagas/auth/routines";
import {connect, ConnectedProps} from "react-redux";
import {IAppState} from "../../models/IAppState";
import NotificationMenu from "../NotificationMenu";
import {toggleMenuRoutine} from "../../sagas/app/routines";
import styled from "styled-components";
import Search from "../Search";
import AccessManager from "../AccessManager";
import {Permissions} from "../AccessManager/rbac-rules";
import {RiLogoutBoxRLine, RiMailSendLine, RiSettings5Line, RiUserReceived2Line} from "react-icons/ri";
import {useTranslation} from "react-i18next";

const StyledItem = styled(Menu.Item)`
    font-size: 1.15em !important;
    font-family: Raleway;
    font-style: normal;
    display: flex !important;
    align-items: center !important;
    font-weight: normal !important;
    color: white !important;
`;

const StyledMenu = styled(Menu)`
    background-color: #535E87 !important;
    color: white !important;
    border-radius: 7px !important;
`;

const defaultAvatar =
    "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const Header: FC<Props> = ({user, logout, toggleMenu, isEditing, toggled}) => {
    const [t] = useTranslation();
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.headerContent}>
                <div className={styles.headerPart}>
                    <div className={styles.headerTitle}>
                        <img onClick={() => toggleMenu(!toggled)} alt="FeedGrabber" className={styles.headerLogo}
                             src={icon}/>
                        <h1 className={styles.headerServiceName} onClick={() => history.push('/home')}>FeedGrabber</h1>
                    </div>
                    <div className={styles.navLinks}>
                        <NavLink exact to="/editor"
                                 className={`${styles.headerMenuItem} ${isEditing && styles.headerMenuItemActive}`}>
                            {t("Form Creator")}
                        </NavLink>
                        <a href="/#" className={styles.headerMenuItem}>
                            {t("Send Request")}
                        </a>
                    </div>
                </div>
                <div className={styles.headerPart}>
                    <Search/>
                    <div className={styles.headerBellWrapper}>
                        <NotificationMenu/>
                    </div>
                    <Popup on='click' style={{padding: 0, background: '#535E87', border: 'none'}} basic
                           trigger={<Image avatar src={user?.avatar ?? defaultAvatar} className={styles.headerAvatar}/>}
                    >
                        <StyledMenu vertical>
                            <StyledItem onClick={() => history.push('/profile')}>
                                <RiUserReceived2Line size="1.3em" color="white"/>&nbsp;&nbsp;
                              <strong>{user.userName}</strong>
                            </StyledItem>
                            <StyledItem onClick={() => history.push('/profile/settings')}>
                                <RiSettings5Line size="1.3em" color="white"/>&nbsp;&nbsp; {t("Settings")}
                            </StyledItem>
                            <AccessManager staticPermission={Permissions.generateInviteLinks}>
                                <StyledItem onClick={() => history.push('/invitations')}>
                                    <RiMailSendLine size="1.3em" color="white"/>&nbsp;&nbsp; {t("Invitations")}
                                </StyledItem>
                            </AccessManager>
                            <StyledItem onClick={logout}>
                                <RiLogoutBoxRLine size="1.3em" color="white"/>&nbsp;&nbsp; {t("Logout")}
                            </StyledItem>
                        </StyledMenu>
                    </Popup>
                </div>
            </div>
        </div>
  );
};

const mapStateToProps = (state: IAppState) => ({
    user: state.user.info,
    isEditing: !!state.questionnaires.current.get.id,
    toggled: state.app.showMenu
});
const mapDispatchToProps = {
  logout: logoutRoutine,
  toggleMenu: toggleMenuRoutine
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
export default connector(Header);
