import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import styles from './style.module.sass';

export interface IRCProps {
  from: number;
  to: number;
  setIndex: (index: number) => void;
}

const ReportSwitcher: React.FC<IRCProps> = ({ from, to, setIndex }) => {
  const [curIndex, setCurIndex] = useState(from);

  const handleIndexChange = (index: number) => {
    const newIndex = index % to;
    if (newIndex === 0) {
      setCurIndex(to);
      setIndex(to);
      return;
    }
    setCurIndex(newIndex);
    setIndex(newIndex);
  };

  const handleClick = (diff: number) => {
    handleIndexChange(curIndex + diff);
  };

  return (
    <div className={styles.report_switcher}>
      <Button icon onClick={() => handleClick(-1)}>
        <Icon name="angle left" />
      </Button>
      <input/>
      <span> / {to}</span>
      <Button icon onClick={() => handleClick(1)}>
        <Icon name="angle right" />
      </Button>
    </div>
  );
};

export default ReportSwitcher;