import React, {FC, useState} from "react";

import styles from './styles.module.sass';
import {Button, Header, Image, Loader, Modal, Select} from "semantic-ui-react";
import {IRoleState} from "../../reducers/role/reducer";
import SwitchRoleModal, {IRoleSwitchDto} from "../SwitchRoleModal";

interface IUserListItemProps {
    id: string;
    name?: string;
    surname?: string;
    contact?: string;
    avatar?: string;
    role: string;
    roleId: string;
    username: string;
    roleState: IRoleState;

    fire?(id: string): void;

    changeRole(dto: IRoleSwitchDto): void;

    loadCompanyRoles(): void;

    toggleModal(): void;
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
        fire,
        role,
        roleId,
        roleState,
        changeRole,
        loadCompanyRoles,
        toggleModal
    }
) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const info = name && surname ? `${name} ${surname}` : `${username}`;

    const confirmationModal = () => {
        return (<Modal
            size="tiny"
            open={showConfirmationModal}
            closeOnDimmerClick
            onClose={() => setShowConfirmationModal(false)}
        >
            <Modal.Header>
                Do you really want to fire {name && surname ? `${name} ${surname}` : `${username} ?`}
            </Modal.Header>
            <Modal.Actions>
                <Button negative onClick={() => setShowConfirmationModal(false)}>
                    No
                </Button>
                <Button positive
                        onClick={() => {
                            setShowConfirmationModal(false);
                            fire(id);
                        }}>
                    Yes
                </Button>
            </Modal.Actions>
        </Modal>);
    };

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
                <Button onClick={() => toggleModal()}>Change role</Button>
            </div>
            <div className={styles.button}>
                {fire && <Button color={"red"} onClick={() => setShowConfirmationModal(true)}>Fire</Button>}
            </div>
            {roleState.isChangeRoleModalOpen &&
            <SwitchRoleModal
                toggleModal={toggleModal}
                companyRoles={roleState.companyRoles}
                roleId={roleId}
                isChanging={roleState.isChanging}
                isLoading={roleState.isLoading}
                userId={id}
                username={username}
                name={name}
                surname={surname}
                changeRole={changeRole}
                loadCompanyRoles={loadCompanyRoles}
            />}
            {confirmationModal()}
        </div>
    );
};

export default UserListItem;
