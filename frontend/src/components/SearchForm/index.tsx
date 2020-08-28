import React, { useState, SyntheticEvent } from 'react';
import { IAppState } from "../../models/IAppState";
import { connect } from "react-redux";
import GenericPagination from "../../components/GenericPagination";
import { IPaginationInfo } from "../../models/IPaginationInfo";
import { IUserInfo } from "../../models/user/types";
import UserListItem from "../../components/UserListItem";
import {
  loadCompanyUsersRoutine,
  removeUserFromCompanyRoutine,
  setUsersPaginationRoutine
} from "../../sagas/users/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import { Formik } from "formik";
import styles from "./styles.module.sass";
import { Dropdown, DropdownProps, Form, Button } from 'semantic-ui-react';

interface IOption {
  key: string | number;
  text: string;
}
const optionsd = [
  { key: 100, text: 'alex' },
  { key: 1000, text: 'fred' },
  { key: 200, text: 'sergey' },
  { key: 300, text: 'elvis' }
];

interface ICompanyUsersListProps {
  onSubmit(searchQuery: string);
  optionList: IOption[];
  onValueChange(searchQuery: string);
}

const SearchForm: React.FC<ICompanyUsersListProps> = (
  {
    onSubmit,
    onValueChange,
    optionList
  }
) => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [options, setOptions] = useState(optionList);
  const [value, setValue] = useState("");

  const handleChange = (data: DropdownProps) => {
    setValue(data.value as string);
    setSearchQuery(data.searchQuery);
  };

  const handleAdd = (data: DropdownProps) => {
    setValue(data.value as string);
    setSearchQuery(data.searchQuery);
  };

  const handleSearchChange = (e, { searchQuery }) => {
    setSearchQuery(searchQuery);
  };

  const handleSearch = () => {
    onSubmit(searchQuery);
  };

  return (
    <>
      <Form>
        <Form.Field>
          <Dropdown
            fluid
            onChange={handleChange}
            onSearchChange={handleSearchChange}
            options={optionList}
            placeholder='Search'
            search
            searchQuery={searchQuery}
            selection
            value={value}
            onAddItem={handleAdd}
            selectOnBlur={false}
          />
          <Button onClick={handleSearch}>Search</Button>
        </Form.Field>
      </Form>
    </>
  );
};

export default SearchForm;
