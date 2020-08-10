import React, {FC} from "react";

import styles from './styles.module.sass';

export interface IGenericButtonProps {
  text: string;
  callback: any;
}

const GenericButton: FC<IGenericButtonProps> = (
  {
    text,
    callback
  }
) => {
  return (
    <button className={styles.paginationButton} key={text} onClick={callback}>
      {text}
    </button>
  );
};

export default GenericButton;
