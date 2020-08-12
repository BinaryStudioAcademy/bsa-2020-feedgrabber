import React, {FC} from "react";

import styles from './styles.module.sass';
import {Icon} from "semantic-ui-react";

interface IGenericAction {
  icon: string;
  callback: any;
}

interface IGenericListItemProps {
  title: string;
  description: string;
  actions: IGenericAction[];
}

const PaginationListItem: FC<IGenericListItemProps> = (
  {
    title,
    description,
    actions
  }
) => {
  return (
    <div className={styles.paginationListItem}>
      <div>
        <h3 className={styles.paginationListItemHeader}>{title}</h3>
        <p className={styles.paginationListItemDescription}>{description}</p>
      </div>
      <div>
        {actions.map(a => <Icon className={a.icon} key={a.icon} onClick={a.callback}/>)}
      </div>
    </div>
  );
};

export default PaginationListItem;
