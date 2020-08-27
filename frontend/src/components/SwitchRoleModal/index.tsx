import React, {FC, useEffect, useState} from "react";

import styles from './styles.module.sass';
import {Button, Dropdown, Image, Header, Modal, Select, Icon, Loader} from "semantic-ui-react";
import {IRoleShort} from "../../models/role/Role";

export interface IRoleSwitchDto {
    userId: string;
    roleId: string;
}

interface ISwitchRoleModalProps {
    companyRoles: IRoleShort[];
    userId: string;
    username: string;
    roleId: string;
    name?: string;
    surname?: string;
    isChanging: boolean;
    isLoading: boolean;

    changeRole(dto: IRoleSwitchDto): void;

    loadCompanyRoles(): void;

    toggleModal(): void;
}

const SwitchRoleModal: FC<ISwitchRoleModalProps> = (
    {
        userId,
        username,
        name,
        surname,
        roleId,
        changeRole,
        loadCompanyRoles,
        companyRoles,
        toggleModal,
        isLoading,
        isChanging

    }
) => {
    // let options = companyRoles.map(r => ({key: r.id, value: r.id, text: r.name}));

    const [selectedRoleId, setSelectedRoleId] = useState("");

    useEffect(() => {
        loadCompanyRoles();
    }, [loadCompanyRoles]);

    useEffect(() => {
        const options = companyRoles
            .map(r => ({key: r.id, value: r.id, text: r.name}));
        setSelectedRoleId(roleId);
    }, [companyRoles, roleId]);

    return (
        <Modal
            size="tiny"
            open={true}
            closeOnDimmerClick
            onClose={() => toggleModal()}
        >
            {isLoading && <Loader/>}
            {!isLoading &&
            <>
                <Modal.Header>
                    Role selection for user {name && surname ? `${name} ${surname}` : `${username}`}
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
                    <Button negative onClick={() => toggleModal()}>
                        Discard changes
                    </Button>
                    <Button
                        positive
                        disabled={selectedRoleId === roleId}
                        onClick={() => changeRole({userId: userId, roleId: selectedRoleId})}
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
