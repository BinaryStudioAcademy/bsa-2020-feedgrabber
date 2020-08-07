import React, {FC} from "react";
import UserCard from "./UserCard";
import styled from "styled-components";

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

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1rem;
    margin-bottom: 1rem;
`;

const UserSelection: FC<IUserSelectionProps> = ({users, setSelected, selectedUsers}) => {

    users = mockUsers.users;

    const addHandler = (user: IUser) => {
        setSelected("selectedUsers", [...selectedUsers, user]);
    };

    const removeHandler = (user: IUser) => {
        setSelected("selectedUsers", selectedUsers.filter(u => u !== user));
    };

    return (
        <Container>
            {users.map((u, i) => {
                const isSelected = Boolean(selectedUsers.find(us => u === us));
                const handler = isSelected ? removeHandler : addHandler;

                return (
                    <UserCard
                        key={i}
                        user={u}
                        clickHandler={e => {
                            e.preventDefault();
                            handler(u);
                        }}
                        isSelected={isSelected}
                    />
                );
            })}
        </Container>
    );
};

// UserSelection.defaultProps = {
const mockUsers = {
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
