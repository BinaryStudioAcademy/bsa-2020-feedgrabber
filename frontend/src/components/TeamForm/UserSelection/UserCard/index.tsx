import React, {FC, useState} from "react";
import {IUser} from "../index";

type UserCardProps = {
    user: IUser;
    add: Function;
    remove: Function;
}

const Index: FC<UserCardProps> = props => {
    const {user, add, remove} = props;

    const [sel, setSel] = useState(false);

    const clickHandler = () => {
        !sel ? add(user) : remove(user);
        setSel(!sel);
    };

    return (
        <div onClick={clickHandler}>
            {user.username + " " + user.lastname}
        </div>
    );
};

export default Index;
