import React, {FC, useEffect, useState} from "react";

import styles from './styles.module.sass';
import {Button, Dropdown, Image, Header, Modal, Select, Icon, Loader} from "semantic-ui-react";
import {IRoleShort} from "../../models/role/Role";
import {IUserInfo} from "../../models/user/types";

export interface IRoleSwitchDto {
    userId: string;
    roleId: string;
}

interface ISwitchRoleModalProps {
    companyRoles: IRoleShort[];
    selectedUser: IUserInfo;
    isChanging: boolean;
    isLoading: boolean;

    changeRole(dto: IRoleSwitchDto): void;

    loadCompanyRoles(): void;

    setSelectedUser(user: IUserInfo): void;
}

const SwitchRoleModal: FC<ISwitchRoleModalProps> = (
    {
        changeRole,
        loadCompanyRoles,
        companyRoles,
        setSelectedUser,
        isLoading,
        isChanging,
        selectedUser

    }
) => {

    const [selectedRoleId, setSelectedRoleId] = useState("");

    useEffect(() => {
        loadCompanyRoles();
    }, [loadCompanyRoles]);

    useEffect(() => {
        const options = companyRoles
            .map(r => ({key: r.id, value: r.id, text: r.name}));
        setSelectedRoleId(selectedUser.roleId);
    }, [companyRoles, selectedUser]);

    return (
        <Modal
            size="tiny"
            open={true}
            closeOnDimmerClick
            onClose={() => setSelectedUser(null)}
        >
            {isLoading && <Loader/>}
            {!isLoading &&
            <>
                <Modal.Header>
                    Role selection for user {selectedUser.firstName && selectedUser.lastName ?
                    `${selectedUser.firstName} ${selectedUser.lastName}` : `${selectedUser.userName}`}
                </Modal.Header>
                <Modal.Content>
                    <div className={styles.container}>
                        <Header>Select new role</Header>
                        <Select compact
                                className={styles.dropdown}
                                options={companyRoles.map(r => ({key: r.id, value: r.id, text: r.name}))}
                                value={selectedRoleId}
                                onChange={(e, data) => {
                                    setSelectedRoleId(data.value as string);
                                }}
                        />
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setSelectedUser(null)}>
                        Discard changes
                    </Button>
                    <Button
                        positive
                        disabled={selectedRoleId === selectedUser.roleId}
                        onClick={() => changeRole({userId: selectedUser.id, roleId: selectedRoleId})}
                        loading={isChanging}
                    >
                        Change
                    </Button>
                </Modal.Actions>
            </>
            }
        </Modal>
    );
};

export default SwitchRoleModal;