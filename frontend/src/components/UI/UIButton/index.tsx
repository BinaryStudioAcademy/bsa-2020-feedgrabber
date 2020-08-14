import React, {FC} from "react";
import styles from "./styles.module.sass";

export interface IUIButton {
  title: string;
  onClick?(): void;
}

const UIButton: FC<IUIButton> = ({title, onClick}) => {
  return (
    <button className={styles.uiButton} onClick={onClick}>
      {title}
    </button>
  );
};

export default UIButton;
