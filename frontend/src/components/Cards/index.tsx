import React from "react";
import {SelectableGroup, SelectAll, DeselectAll} from "react-selectable-fast/lib";
import User from "./user";

export interface IUser {
    username: string;
    firstname: string;
    lastname: string;
    avatar: string;
}

export interface IHeaderProps {
    users?: IUser[];
    selectedUsers: IUser[];
    setSelected: Function;
}

const Cards: React.FunctionComponent<IHeaderProps> = ({users, setSelected, selectedUsers}) => {

    const addHandler = (user: IUser) => {
        setSelected("selectedUsers", [...selectedUsers, user]);
    };

    const removeHandler = (user: IUser) => {
          setSelected("selectedUsers", selectedUsers.filter(u => u !== user));
    };
    // const removeHandler = (user: IUser) => users.f

    return (
    <SelectableGroup
        className="main"
        clickClassName="tick"
        enableDeselect
        // globalMouse={this.state.isGlobal}
        allowClickWithoutSelected={true}
        // duringSelection={this.handleSelecting}
        // onSelectionClear={this.handleSelectionClear}
        // onSelectionFinish={this.handleSelectionFinish}
        // onSelectedItemUnmount={this.handleSelectedItemUnmount}
    >
        <div>
            <SelectAll className="selectable-button">
                <button>Select all</button>
            </SelectAll>
            <DeselectAll className="selectable-button">
                <button>Clear selection</button>
            </DeselectAll>
            {users.map((u, i) => (
                <User
                    key={i}
                    user={u}
                    add={addHandler}
                    remove={removeHandler}
                />
            ))}
        </div>
    </SelectableGroup>
);
};

Cards.defaultProps = {
    users: [
        {
            username: "nick",
            avatar: "https://img.icons8.com/cotton/64/000000/chat.png",
            firstname: "boy",
            lastname: "boi"
        },
        {
            username: "alskdf",
            avatar: "https://img.icons8.com/cotton/64/000000/chat.png",
            firstname: "boy",
            lastname: "boi"
        },
        {
            username: "kakak",
            avatar: "https://img.icons8.com/cotton/64/000000/chat.png",
            firstname: "boy",
            lastname: "boi"
        },
        {
            username: "sicc",
            avatar: "https://img.icons8.com/cotton/64/000000/chat.png",
            firstname: "man",
            lastname: "tab"
        }
    ]
};
export default Cards;
