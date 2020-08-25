import React, {FC} from "react";
import styles from "./styles.module.sass";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUICardBlockProps {
  className?: string;
  onClick?: () => void;
}

const UICardBlock: FC<IUICardBlockProps> = ({children, className, onClick}) => {
  return (
    <div onClick={onClick} className={`${styles.uiCardBlock} ${className || ""}`}>
      {children}
    </div>
  );
};

export default UICardBlock;
