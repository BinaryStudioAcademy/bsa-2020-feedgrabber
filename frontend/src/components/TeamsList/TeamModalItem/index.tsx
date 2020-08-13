import React from "react";
import {Icon} from "semantic-ui-react";
import styles from "./styles.module.sass";

export interface IModalItemProps {
    userName: string;
    index: number;

    remove(index: number): void;
}

const TeamsModalItem: React.FunctionComponent<IModalItemProps> = ({userName, index, remove}) => (
    <div className={styles.user_item_container}>
        <div>
            <Icon name={"user outline"}/>
            <span>{userName}</span>
        </div>
        <Icon className={styles.close_icon} name={"x"} onClick={() => remove(index)
        }/>
    </div>
);
export default TeamsModalItem;