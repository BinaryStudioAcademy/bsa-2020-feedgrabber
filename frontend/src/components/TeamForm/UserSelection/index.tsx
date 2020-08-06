import React, {FC} from "react";
import Index from "./UserCard";
import {Button} from "semantic-ui-react";

export interface IUser {
    username: string;
    firstname: string;
    lastname: string;
    avatar: string;
}

export interface IUserSelectionProps {
    users?: IUser[];
    selectedUsers: IUser[];
    setSelected: Function;
}

const UserSelection: FC<IUserSelectionProps> = ({users, setSelected, selectedUsers}) => {

    const addHandler = (user: IUser) => {
        setSelected("selectedUsers", [...selectedUsers, user]);
    };

    const removeHandler = (user: IUser) => {
        setSelected("selectedUsers", selectedUsers.filter(u => u !== user));
    };

    const clearHandler = () => {
        setSelected("selectedUsers", []);
    };

    return (
        <>
            <Button onClick={clearHandler}>Clear selection</Button>
            {users.map((u, i) => (
                <Index
                    key={i}
                    user={u}
                    add={addHandler}
                    remove={removeHandler}
                />
            ))}
        </>
    );
};

UserSelection.defaultProps = {
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
export default UserSelection;
