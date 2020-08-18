import React, { FC } from "react";
import styles from "./styles.module.scss";
import { Header, Label, List, Segment } from "semantic-ui-react";

export interface IUIListItemProps {
    name: string;
    key: string;
    category?: string;
}

const UIListItem: FC<IUIListItemProps> = ({ name, children, key, category }) => {
    return (
        <List.Item key={key}>
            <div className={styles.listContainer}>
                <Segment very padded>
                    <Header
                        as='h2'
                        className={styles.name}>{name}
                        {category ?
                            <Label>{category}</Label>
                            : <></>}
                    </Header>
                    {children}
                </Segment>
            </div>
        </List.Item>
    );
};

export default UIListItem;