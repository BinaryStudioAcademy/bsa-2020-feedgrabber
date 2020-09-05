import React, {FC} from 'react';
import {Image} from 'semantic-ui-react';
import styles from "./styles.module.sass";

interface IUIUserItemCardProps {
  username?: string;
  userInfo?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  onClick?: () => void;
  selected?: boolean;
}

const defaultAvatar =
    "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";
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
            {firstName && lastName ? `${lastName} ${firstName}` : ''}
          </div>
          <div className={styles.userInfo}>{userInfo}</div>
        </div>
    );

export default UIUserItemCard;
