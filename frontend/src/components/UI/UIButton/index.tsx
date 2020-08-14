import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIButtonProps {
  title: string;
  onClick?(): void;
}

const UIButton: FC<IUIButtonProps> = ({title, onClick}) => {
  return (
    <button className={styles.uiButton} onClick={onClick}>
      {title}
    </button>
  );
};

export default UIButton;
