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

interface ICompanyUsersListProps {
  pagination?: IPaginationInfo<IUserInfo>;
  isLoading: boolean;
  userRole: string;
  loadUsers(): void;
  fireUser(id: string): void;
  setPagination(pagination: IPaginationInfo<IUserInfo>): void;
}

const CompanyUsersList: React.FC<ICompanyUsersListProps> = (
  {
    pagination,
    isLoading,
    loadUsers,
    fireUser,
    setPagination,
    userRole
  }
) => {
  const mapItemToJSX = (user: IUserInfo) => (
    <UserListItem
      key={user.id}
      id={user.id}
      name={user.firstName}
      surname={user.lastName}
      avatar={user.avatar}
      contact={user.phoneNumber}
      username={user.userName}
      fire={userRole && userRole === 'company_owner' ? fireUser : undefined}
    />
  );

  return (
    <>
      <UIPageTitle title="Users" />
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
    </>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
  pagination: rootState.users.pagination,
  isLoading: rootState.users.isLoading,
  userRole: rootState.user.info?.role
});

const mapDispatchToProps = {
  loadUsers: loadCompanyUsersRoutine,
  fireUser: removeUserFromCompanyRoutine,
  setPagination: setUsersPaginationRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyUsersList);
