import React, {FC} from "react";

import styles from './styles.module.sass';
import {Icon} from "semantic-ui-react";

interface IGenericAction {
  icon: string;
  callback: any;
}

interface IGenericListItemProps {
  id: string;
  title: string;
  description: string;
  actions: IGenericAction[];
}

const GenericListItem: FC<IGenericListItemProps> = (
  {
    id,
    title,
    description,
    actions
  }
) => {
  return (
    <div key={id} className={styles.paginationListItem}>
      <div>
        <h3 className={styles.paginationListItemHeader}>{title}</h3>
        <p className={styles.paginationListItemDescription}>{description}</p>
      </div>
      <div>
        {actions.map(a => <Icon className={a.icon} onClick={a.callback}/>)}
      </div>
    </div>
  );
};

export default GenericListItem;
