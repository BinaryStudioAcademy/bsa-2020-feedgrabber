import React, {useState, SyntheticEvent, ChangeEvent} from 'react';
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

const optionsd = [
  { key: 100, text: 'alex' },
  { key: 1000, text: 'fred' },
  { key: 200, text: 'sergey' },
  { key: 300, text: 'elvis' }
];

const defaultSize = 10;

interface ICompanyUsersListProps {
  pagination?: IPaginationInfo<IUserInfo>;
  isLoading: boolean;
  userRole: string;
  loadUsers(query?: string): void;
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

  const search = () => (
    <div>
      <Input
        icon={{ name: 'search', circular: true, link: true, onClick: handleSearch }}
        placeholder='Search employee'
        value={searchQuery}
        onChange={handleChange}
      />
      <Button onClick={handleClear}>clear</Button>
    </div>
  );

  return (
    <>
      <UIPageTitle title="Users" />
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
