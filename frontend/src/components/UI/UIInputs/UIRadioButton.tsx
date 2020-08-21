import React from 'react';
import styles from './styles.module.scss';

type InputProps = React.ComponentProps<'input'>

const UIRadioButton = props => {
  return <input className={styles.customInput} type='radio' {...props}/>;
};

export default UIRadioButton;