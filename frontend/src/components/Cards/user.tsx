import React, {FC} from "react";
import {createSelectable, TSelectableItemProps} from 'react-selectable-fast';
import {IUser} from "./index";

const User: FC<TSelectableItemProps & IUser> = props => {
    const {selectableRef, isSelected, isSelecting, username} = props;

    console.log(isSelected);

    return (
        <div ref={selectableRef}>
            {username}
        </div>
    );
};

export default createSelectable(User);
