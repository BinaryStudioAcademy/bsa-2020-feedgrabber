import React, { FC } from "react";
import styles from "./styles.module.scss";
import { Header, Label, List, Segment } from "semantic-ui-react";

export interface IUIListItemProps {
    name: string;
    category?: string;
}

const UIListItem: FC<IUIListItemProps> = ({ name, children, category }) => {
    return (
        <List.Item>
            <div className={styles.listContainer}>
                <Segment padded>
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