import React, {FC} from 'react';
import {Image} from 'semantic-ui-react';
import styles from "./styles.module.sass";

interface IUIUserItemCardProps {
  userInfo?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  onClick?: () => void;
  selected?: boolean;
}

const defaultAvatar =
    "https://upload.wikimedia.org/wikipedia/commons/7/77/Avatar_cat.png";
const UIUserItemCard: FC<IUIUserItemCardProps> =
    ({
       userInfo,
       firstName,
       lastName,
       avatar,
       onClick,
       selected
     }) => (
        <div className={[styles.userGrid, onClick && styles.hoverable, selected && styles.selected].join(' ')}
             onClick={onClick}>
          <div className={styles.userAvatar}><Image src={avatar ? avatar : defaultAvatar} size='large' circular/></div>
          <div className={styles.userNames}>
            {(lastName !== undefined ? lastName : '') + ' ' + (firstName !== undefined ? firstName : '')}
          </div>
          <div className={styles.userInfo}>{userInfo}</div>
        </div>
    );

export default UIUserItemCard;