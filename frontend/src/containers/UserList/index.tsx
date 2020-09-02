import React, {useState, ChangeEvent} from 'react';
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
import { Button, Input} from 'semantic-ui-react';
import styles from './styles.module.sass';
import {IRoleState} from "../../reducers/role/reducer";
import {changeRoleRoutine, loadShortRolesRoutine, setSelectedUserRoutine} from "../../sagas/role/routines";
import SwitchRoleModal, {IRoleSwitchDto} from "../../components/SwitchRoleModal";
import { useTranslation } from 'react-i18next';

const defaultSize = 10;

// interface ICompanyUsersListProps {
//   pagination?: IPaginationInfo<IUserInfo>;
//   isLoading: boolean;
//   userRole: string;
//   loadUsers(query?: string): void;
//   fireUser(id: string): void;
//   setPagination(pagination: IPaginationInfo<IUserInfo>): void;
// }

interface ICompanyUsersListProps {
  pagination?: IPaginationInfo<IUserInfo>;
  isLoading: boolean;
  userRole: string;
  roleState: IRoleState;
  loadUsers(query?: string): void;
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

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch= () => {
    setPagination({ total: 0, page: 0, size: defaultSize, items: [] });
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
      <Input style={{width: '450px'}}
             icon={{ name: 'search', circular: true, link: true, onClick: handleSearch }}
             placeholder={t("Search employee")}
             value={searchQuery}
             onKeyPress={onKeyPressed}
             onChange={handleChange}
      />
      <Button onClick={handleClear} color='blue' size={"small"}>{("clear")}</Button>
    </div>
  );

  const [t] = useTranslation();

  return (
    <>
      <UIPageTitle title={t("Users")}/>
      <UIContent>
        <UIColumn>
          {search()}
          <GenericPagination
            isLoading={isLoading}
            pagination={pagination}
            setPagination={setPagination}
            loadItems={loadItems}
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
