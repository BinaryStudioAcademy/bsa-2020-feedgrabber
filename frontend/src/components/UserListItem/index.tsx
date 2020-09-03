import React, {FC, useState} from "react";

import styles from './styles.module.sass';
import {Button, Icon, Image, Modal} from "semantic-ui-react";
import {IRoleState} from "../../reducers/role/reducer";
import {IUserInfo} from "../../models/user/types";
import {ISearchResult} from "../../models/search/Search";
import UIButton from "../UI/UIButton";

interface IUserListItemProps {
    user: IUserInfo;
    roleState: IRoleState;
    result?: ISearchResult;

    fire(id: string): void;

    loadCompanyRoles(): void;

    setSelectedUser(user: IUserInfo): void;
}

const defaultAvatar =
    "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const UserListItem: FC<IUserListItemProps> = (
    {
        user,
        fire,
        setSelectedUser,
        result
    }
) => {
    const {id, firstName, lastName, role, avatar, userName, phoneNumber} = user;

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const info = firstName && lastName ? `${lastName} ${firstName}` : `${userName}`;

    const confirmationModal = () => {
        return (<Modal
            size="tiny"
            open={showConfirmationModal}
            closeOnDimmerClick
            onClose={() => setShowConfirmationModal(false)}
        >
            <Modal.Header>
                Do you really want to fire {firstName && lastName ? `${lastName} ${firstName}` : `${userName} ?`}
            </Modal.Header>
            <Modal.Actions>
                <UIButton onClick={() => setShowConfirmationModal(false)} title={'No'}/>
                <UIButton secondary
                        onClick={() => {
                            setShowConfirmationModal(false);
                            fire(id);
                        }}
                title={'Yes'}/>
            </Modal.Actions>
        </Modal>);
    };

    const match = result
        ?.users
        .map(u => u.id)
        .includes(id);

    return (
        <>
            <div className={`${styles.listItem} ${match && styles.searched}`}>
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
                     {role !== 'company_owner' &&
                    <UIButton title={'Switch role'} onClick={() => setSelectedUser(user)}/>}
                   {role !== 'company_owner' &&
                    <UIButton secondary title={'Fire'} onClick={() => setShowConfirmationModal(true)}/>}
                </div>

            </div>
            {confirmationModal()}
        </>

    );
};

export default UserListItem;
