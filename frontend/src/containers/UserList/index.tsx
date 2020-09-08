import React, {useState, ChangeEvent} from 'react';
import {IAppState} from "../../models/IAppState";
import {connect} from "react-redux";
import GenericPagination from "../../components/helpers/GenericPagination";
import {IPaginationInfo} from "../../models/IPaginationInfo";
import {IUserInfo} from "../../models/user/types";
import UserListItem from "../../components/UserListItem";
import FiredUserListItem from "../../components/FiredUserListItem";
import {
    loadCompanyUsersRoutine,
    removeUserFromCompanyRoutine,
    setUsersPaginationRoutine,
    loadFiredUsersRoutine,
    unfireUserRoutine,
    setFiredUsersPaginationRoutine
} from "../../sagas/users/routines";
import UIColumn from "../../components/UI/UIColumn";
import { Input, Header } from 'semantic-ui-react';
import styles from './styles.module.sass';
import {IRoleState} from "../../reducers/role/reducer";
import {changeRoleRoutine, loadShortRolesRoutine, setSelectedUserRoutine} from "../../sagas/role/routines";
import SwitchRoleModal, {IRoleSwitchDto} from "../../components/SwitchRoleModal";
import {useTranslation} from 'react-i18next';
import {ISearchResult} from "../../models/search/Search";
import UIButton from "../../components/UI/UIButton";

const defaultSize = 10;

interface ICompanyUsersListProps {
    pagination?: IPaginationInfo<IUserInfo>;
    isLoading: boolean;
    paginationFired?: IPaginationInfo<IUserInfo>;
    isFiredLoading?: boolean;
    userRole: string;
    roleState: IRoleState;

    loadUsers(query?: string): void;
    loadFiredUsers(query?: string): void;
    fireUser(id: string): void;
    unfireUser(id: string): void;
    setPagination(pagination: IPaginationInfo<IUserInfo>): void;
    setFiredPagination(pagination: IPaginationInfo<IUserInfo>): void;
    changeUserRole(dto: IRoleSwitchDto): void;
    loadCompanyRoles(): void;
    setSelectedUser(user: IUserInfo): void;
    result: ISearchResult;
}

const CompanyUsersList: React.FC<ICompanyUsersListProps> = (
    {
        pagination,
        isLoading,
        paginationFired,
        isFiredLoading,
        loadUsers,
        loadFiredUsers,
        fireUser,
        unfireUser,
        setPagination,
        roleState,
        loadCompanyRoles,
        changeUserRole,
        setSelectedUser,
        setFiredPagination,
        result
    }
) => {
    const mapUsersToJSX = (user: IUserInfo) => (
        <UserListItem
            key={user.id}
            user={user}
            roleState={roleState}
            fire={fireUser}
            loadCompanyRoles={loadCompanyRoles}
            setSelectedUser={setSelectedUser}
        />
    );

    const mapFiredUsersToJSX = (user: IUserInfo) => (
        <FiredUserListItem
            key={user.id}
            user={user}
            unfire={unfireUser}
        />
    );

    const [t] = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearch, setIsSearch] = useState(false);

    const handleSearch = () => {
        setPagination({total: 0, page: 0, size: defaultSize, items: []});
        setIsSearch(true);
        loadUsers(searchQuery);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const loadItems = () => {
        isSearch ? loadUsers(searchQuery) : loadUsers();
    };

    const handleClear = () => {
        setPagination({ total: 0, page: 0, size: defaultSize, items: [] });
        setIsSearch(false);
        setSearchQuery("");
        loadUsers();
    };

    const onKeyPressed = (evt: KeyboardEvent) => {
        if (evt.charCode === 13) {
            handleSearch();
        }
    };

    const search = () => (
        <div className={styles.searchContainer}>
            <Input style={{width: '450px', marginRight: '1em'}}
                   icon={{
                     name: 'search',
                     circular: true,
                     link: true,
                     onClick: handleSearch,
                     style: {boxShadow: "none"}
                   }}
                   placeholder={t('Search employee')}
                   value={searchQuery}
                   onKeyPress={onKeyPressed}
                   onChange={handleChange}
            />
            <UIButton onClick={handleClear} title={t("clear")} primary/>
        </div>
    );

    return (
        <div className={styles.pageContainer}>
            <UIColumn wide>
                <Header as="h2">{t("All Employees")}</Header>
                {search()}
                <GenericPagination
                    isLoading={isLoading}
                    pagination={pagination}
                    setPagination={setPagination}
                    loadItems={loadItems}
                    mapItemToJSX={mapUsersToJSX}
                />
            </UIColumn>
            <br />
            <UIColumn wide>
                <Header as="h2">{t("Fired Users")}</Header>
                <GenericPagination
                    isLoading={isFiredLoading}
                    pagination={paginationFired}
                    setPagination={setFiredPagination}
                    loadItems={loadFiredUsers}
                    mapItemToJSX={mapFiredUsersToJSX}
                />
            </UIColumn>
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
        </div>
    );
};

const mapStateToProps = (rootState: IAppState) => ({
    pagination: rootState.users.pagination,
    isLoading: rootState.users.isLoading,
    paginationFired: rootState.users.paginationFired,
    isFiredLoading: rootState.users.isFiredLoading,
    userRole: rootState.user.info?.role,
    roleState: rootState.role,
    result: rootState.search.result
});

const mapDispatchToProps = {
    loadUsers: loadCompanyUsersRoutine,
    loadFiredUsers: loadFiredUsersRoutine,
    loadCompanyRoles: loadShortRolesRoutine,
    changeUserRole: changeRoleRoutine,
    unfireUser: unfireUserRoutine,
    fireUser: removeUserFromCompanyRoutine,
    setPagination: setUsersPaginationRoutine,
    setFiredPagination: setFiredUsersPaginationRoutine,
    setSelectedUser: setSelectedUserRoutine
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyUsersList);
