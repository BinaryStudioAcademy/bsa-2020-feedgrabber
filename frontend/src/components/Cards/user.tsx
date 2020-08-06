import React, {FC, useEffect, useState} from "react";
import {createSelectable, TSelectableItemProps} from 'react-selectable-fast';
import {IUser} from "./index";

type UserCardProps = TSelectableItemProps & {user: IUser} & {add: Function} & {remove: Function};

const User: FC<UserCardProps> = props => {
    const {selectableRef, isSelected, isSelecting, user, add, remove} = props;

    const [sel, setSel] = useState(false);
    const [selecting, setSelecting] = useState(isSelected);

    useEffect(() => {
        if (sel !== isSelected) {
            isSelected ? add(user) : remove(user);
            setSel(!sel);
        }
    }, [isSelected, sel, remove, add, user]);

    return (
        <div ref={selectableRef}>
            {user.username}
        </div>
    );
};

export default createSelectable(User);
