import React from 'react';
import styles from './styles.module.scss';

type InputProps = React.ComponentProps<'input'>

const UICheckbox = props => {
  return <input className={styles.customInput} type='checkbox' {...props}/>;
};

export default UICheckbox;