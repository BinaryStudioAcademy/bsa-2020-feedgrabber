import React, {FC} from "react";

import styles from './styles.module.sass';

export interface IGenericButtonProps {
  text: string;
  callback: any;
}

const PaginationButton: FC<IGenericButtonProps> = (
  {
    text,
    callback
  }
) => {
  return (
    <button className={styles.paginationButton} onClick={callback}>
      {text}
    </button>
  );
};

export default PaginationButton;
