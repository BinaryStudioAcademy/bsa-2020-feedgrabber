import React from 'react';
import styles from './styles.module.scss';

type InputProps = React.ComponentProps<'input'>

const UISwitch: React.FC<InputProps> = props => {
  return <input className={styles.customInput + ' ' + styles.switch} type='checkbox' {...props}/>;
};

export default UISwitch;