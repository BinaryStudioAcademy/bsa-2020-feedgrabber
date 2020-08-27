import React from 'react';
import {IAppState} from "../../models/IAppState";
import {connect} from "react-redux";
import GenericPagination from "../../components/GenericPagination";
import {IPaginationInfo} from "../../models/IPaginationInfo";
import {IUserInfo} from "../../models/user/types";
import UserListItem from "../../components/UserListItem";
import {
    loadCompanyUsersRoutine,
    removeUserFromCompanyRoutine,
    setUsersPaginationRoutine
} from "../../sagas/users/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import {IRoleState} from "../../reducers/role/reducer";
import {changeRoleRoutine, loadShortRolesRoutine, setSelectedUserRoutine} from "../../sagas/role/routines";
import SwitchRoleModal, {IRoleSwitchDto} from "../../components/SwitchRoleModal";

interface ICompanyUsersListProps {
    pagination?: IPaginationInfo<IUserInfo>;
    isLoading: boolean;
    userRole: string;
    roleState: IRoleState;

    loadUsers(): void;

    fireUser(id: string): void;

    setPagination(pagination: IPaginationInfo<IUserInfo>): void;

    changeUserRole(dto: IRoleSwitchDto): void;

    loadCompanyRoles(): void;

    setSelectedUser(user: IUserInfo): void;
}

const CompanyUsersList: React.FC<ICompanyUsersListProps> = (
    {
        pagination,
        isLoading,
        loadUsers,
        fireUser,
        setPagination,
        roleState,
        loadCompanyRoles,
        changeUserRole,
        setSelectedUser
    }
) => {
    const mapItemToJSX = (user: IUserInfo) => (
        <UserListItem
            key={user.id}
            user={user}
            roleState={roleState}
            fire={fireUser}
            loadCompanyRoles={loadCompanyRoles}
            setSelectedUser={setSelectedUser}
        />
    );

    return (
        <>
            <UIPageTitle title="Users"/>
            <UIContent>
                <UIColumn>
                    <GenericPagination
                        isLoading={isLoading}
                        pagination={pagination}
                        setPagination={setPagination}
                        loadItems={loadUsers}
                        mapItemToJSX={mapItemToJSX}
                    />
                </UIColumn>
            </UIContent>
            {roleState.selectedUser &&
            <SwitchRoleModal
                changeRole={changeUserRole}
                setSelectedUser={setSelectedUser}
                selectedUser={roleState.selectedUser}
                companyRoles={roleState.companyRoles}
                isChanging={roleState.isChanging}
                isLoading={roleState.isLoading}
                loadCompanyRoles={loadCompanyRoles}
            />}
        </>
    );
};

const mapStateToProps = (rootState: IAppState) => ({
    pagination: rootState.users.pagination,
    isLoading: rootState.users.isLoading,
    userRole: rootState.user.info?.role,
    roleState: rootState.role
});

const mapDispatchToProps = {
    loadUsers: loadCompanyUsersRoutine,
    loadCompanyRoles: loadShortRolesRoutine,
    changeUserRole: changeRoleRoutine,
    fireUser: removeUserFromCompanyRoutine,
    setPagination: setUsersPaginationRoutine,
    setSelectedUser: setSelectedUserRoutine
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyUsersList);
