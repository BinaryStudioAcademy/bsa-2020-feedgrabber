import React, {FC} from "react";
import {Icon, Input} from "semantic-ui-react";

export const Search: FC = () => {
    return(
        <Input placeholder='Search...' size="small" transparent inverted
               icon={<Icon name='search' inverted link/>}/>
    );
};