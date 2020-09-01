import React, {FC} from 'react';
import styles from './styles.module.sass';

const UIBackgroundWrapper: FC = ({children}) => {
  return (
      <div className={styles.uiBackground}>
        {children}
      </div>
  );
};

export default UIBackgroundWrapper;
