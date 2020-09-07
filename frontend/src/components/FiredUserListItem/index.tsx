import React, { FC, useState } from "react";
import { Icon, Image } from "semantic-ui-react";
import { IRoleState } from "../../reducers/role/reducer";
import { IUserInfo } from "../../models/user/types";
import { ISearchResult } from "../../models/search/Search";
import UIButton from "../UI/UIButton";

import styles from '../UserListItem/styles.module.sass';

interface IUserListItemProps {
    user: IUserInfo;
    unfire(id: string): void;
}

const defaultAvatar =
    "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const FiredUserListItem: FC<IUserListItemProps> = ({
    user,
    unfire
}) => {
    const {id, firstName, lastName, role, avatar, userName} = user;
    const info = firstName && lastName ? `${lastName} ${firstName}` : `${userName}`;

    return (
        <>
            <div className={`${styles.listItem}`}>
                <div className={styles.userImage}>
                    <Image src={avatar ?? defaultAvatar} size='tiny' circular/>
                </div>
                <div className={styles.header}>
                    <h3 className={styles.fullName}>{info}</h3>
                </div>
                <div className={styles.info}>
                    {firstName && lastName && <div className={styles.infoItem}>
                        <Icon color={"grey"} name='at'/>
                        <p>{userName}</p>
                    </div>}
                    <div className={styles.infoItem}>
                        <Icon color={"grey"} name='briefcase'/>
                        <p>{role.replace("_", " ")}</p>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <UIButton title={'Unfire'} onClick={() => unfire(id)}/>
                </div>

            </div>
        </>

    );
};

export default FiredUserListItem;
