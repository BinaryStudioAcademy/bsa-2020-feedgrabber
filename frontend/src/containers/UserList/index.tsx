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
import styles from './styles.module.sass';

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

  const onKeyPressed = (evt: KeyboardEvent) => {
      if (evt.charCode == 13) {
        handleSearch();
      }
  };

  const search = () => (
    <div className={styles.searchContainer}>
      <Input style={{width: '450px'}}
        icon={{ name: 'search', circular: true, link: true, onClick: handleSearch }}
        placeholder='Search employee'
        value={searchQuery}
        onKeyPress={onKeyPressed}
        onChange={handleChange}
      />
      <Button onClick={handleClear} color='blue' size={"small"}>clear</Button>
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
