import React, {FC, useState} from "react";
import {Image, Divider, Icon, Input} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {history} from "../../helpers/history.helper";
import styles from "./styles.module.sass";
import icon from "../../assets/images/logo.svg";
import {logoutRoutine} from "../../sagas/auth/routines";
import {connect, ConnectedProps} from "react-redux";
import {IAppState} from "../../models/IAppState";
import NotificationMenu from "../NotificationMenu";
import {toggleMenuRoutine} from "../../sagas/app/routines";
import {Menu, MenuItem, MenuProps, withStyles} from "@material-ui/core";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        borderRadius: '6px',
        minWidth: 'fit-content',
        padding: '.7em',
        '& span': {
            fontSize: '1.2em',
            fontWeight: '400',
            color: '#717171'
        },
        '& ul': {
          padding: '0',
            '& h4': {
                fontSize: '1.15em',
                fontWeight: 'bold',
                color: '#717171',
                padding: '.3em'
            }
        },
        '& li': {
            padding: '.3em .5em .3em .5em'
        }
    }
})((props: MenuProps) => (
    <Menu
        getContentAnchorEl={null}
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        transformOrigin={{
            vertical: -12,
            horizontal: "center"
        }}
        {...props}
    />
));

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
                    <Input placeholder='Search...' size="small" transparent inverted
                           icon={<Icon name='search' inverted link />}/>
                    <StyledMenu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <h4>{user.userName}</h4>
                        <Divider style={{margin: '.25em'}}/>
                        <MenuItem onClick={close(() => history.push('/profile'))}>
                            <span>Profile</span>
                        </MenuItem>
                        <MenuItem onClick={close(() => history.push('/profile/settings'))}>
                            <span>Settings</span>
                        </MenuItem>
                        <MenuItem onClick={close(() => history.push('/requests'))}>
                            <span>Request</span>
                        </MenuItem>
                        <MenuItem onClick={close(() => logout())}>
                            <span className={styles.headerMenuText}>Log out</span>
                        </MenuItem>
                    </StyledMenu>
                    <div className={styles.headerBellWrapper}>
                        <NotificationMenu/>
                    </div>
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
