import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIButtonProps {
  title: string;
  onClick?(): void;
  type?: 'button'|'submit'|'reset';
}

const UIButton: FC<IUIButtonProps> = ({title, onClick, type}) => {
  return (
    <button className={styles.uiButton} onClick={onClick} type={type}>
      {title}
    </button>
  );
};

export default UIButton;
