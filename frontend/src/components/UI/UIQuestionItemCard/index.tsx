import React, {FC} from "react";
import styles from "./styles.module.scss";
import { List, Segment } from "semantic-ui-react";

export interface IUIListItemProps {
    name: string;
    key: string;
}

const UIListItem: FC<IUIListItemProps> = ({name, children, key}) => {
    return (
        <List.Item key={key}>
            <div className={styles.listContainer}>
                <Segment very padded>
                    <h2 className={styles.name}>{name}</h2>
                    {children}
                </Segment>
            </div>
        </List.Item>
        );
};

export default UIListItem;