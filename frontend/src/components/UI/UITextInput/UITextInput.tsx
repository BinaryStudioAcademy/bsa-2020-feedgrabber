import React from 'react';
import styles from './styles.module.sass';

type InputProps = React.ComponentProps<'input'> &
    {
      labelText: string;
      error?: string;
      password?: boolean;
    }

const UITextInput: React.FC<InputProps> =
    ({
       labelText,
       error,
       password,
       ...rest
     }) => {
      return (
          <div className={styles.uiInput}>
            <label>
              <div className={styles.labelText}>{labelText}</div>
              <input className={error && styles.errored} type={password ? 'password' : 'text'} {...rest}/>
            </label>
          </div>
      );
    };

export default UITextInput;