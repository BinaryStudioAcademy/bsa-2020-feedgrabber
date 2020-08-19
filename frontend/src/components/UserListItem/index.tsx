import React, {FC} from "react";

import styles from './styles.module.sass';
import {Button, Image} from "semantic-ui-react";

interface IUserListItemProps {
    id: string;
    name?: string;
    surname?: string;
    contact?: string;
    avatar?: string;
    username: string;

    fire?(id: string): void;
}

const defaultAvatar =
    "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const UserListItem: FC<IUserListItemProps> = (
    {
        id,
        username,
        avatar,
        name,
        surname,
        contact,
        fire
    }
) => {
    const info = name && surname ? `${name} ${surname}` : `${username}`;
    return (
        <div className={styles.listItem}>
            <div className={styles.userImage}>
                <Image src={avatar ?? defaultAvatar} size='tiny' circular/>
            </div>
            <div className={styles.info}>
                <h3 className={styles.paginationListItemHeader}>{info}</h3>
                <p className={styles.paginationListItemDescription}>{contact}</p>
            </div>
            <div className={styles.button}>
                {fire && <Button onClick={() => fire(id)}>fire</Button>}
            </div>
        </div>
    );
};

export default UserListItem;