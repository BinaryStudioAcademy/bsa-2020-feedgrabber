import React, {FC} from "react";
import UserCard from "./UserCard";

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

const styles = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gridGap: "1rem",
    marginBottom: "1rem"
};

const UserSelection: FC<IUserSelectionProps> = ({users, setSelected, selectedUsers}) => {

    const addHandler = (user: IUser) => {
        setSelected("selectedUsers", [...selectedUsers, user]);
    };

    const removeHandler = (user: IUser) => {
        setSelected("selectedUsers", selectedUsers.filter(u => u !== user));
    };

    return (
        <div style={styles}>
            {users.map((u, i) => (
                <UserCard
                    key={i}
                    user={u}
                    add={addHandler}
                    remove={removeHandler}
                />
            ))}
        </div>
    );
};

UserSelection.defaultProps = {
    users: [
        {
            username: "Keep-Simple",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Nick",
            lastname: "Crack"
        },
        {
            username: "Vladikavkaz",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Vlad",
            lastname: "Borshc"
        },
        {
            username: "AmericanDream",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Peter",
            lastname: "Sagan"
        },
        {
            username: "TallTree",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Evan",
            lastname: "Savage"
        },
        {
            username: "Keep-Simple",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Nick",
            lastname: "Crack"
        },
        {
            username: "Vladikavkaz",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Vlad",
            lastname: "Borshc"
        },
        {
            username: "AmericanDream",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Peter",
            lastname: "Sagan"
        },
        {
            username: "TallTree",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Evan",
            lastname: "Savage"
        },
        {
            username: "Keep-Simple",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Nick",
            lastname: "Crack"
        },
        {
            username: "Vladikavkaz",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Vlad",
            lastname: "Borshc"
        },
        {
            username: "AmericanDream",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Peter",
            lastname: "Sagan"
        },
        {
            username: "TallTree",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Evan",
            lastname: "Savage"
        },
        {
            username: "Keep-Simple",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Nick",
            lastname: "Crack"
        },
        {
            username: "Vladikavkaz",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Vlad",
            lastname: "Borshc"
        },
        {
            username: "AmericanDream",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Peter",
            lastname: "Sagan"
        },
        {
            username: "TallTree",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Evan",
            lastname: "Savage"
        },
        {
            username: "Keep-Simple",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Nick",
            lastname: "Crack"
        },
        {
            username: "Vladikavkaz",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Vlad",
            lastname: "Borshc"
        },
        {
            username: "AmericanDream",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Peter",
            lastname: "Sagan"
        },
        {
            username: "TallTree",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Evan",
            lastname: "Savage"
        },
        {
            username: "Keep-Simple",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Nick",
            lastname: "Crack"
        },
        {
            username: "Vladikavkaz",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Vlad",
            lastname: "Borshc"
        },
        {
            username: "AmericanDream",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Peter",
            lastname: "Sagan"
        },
        {
            username: "TallTree",
            avatar: "https://api.adorable.io/avatars/159/abott@adorable.png",
            firstname: "Evan",
            lastname: "Savage"
        }
    ]
};
export default UserSelection;
