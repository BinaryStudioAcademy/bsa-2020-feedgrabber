import React from 'react';
import styles from './styles.module.sass';
import PhoneInput from 'react-phone-number-input/input';

type InputProps = React.ComponentProps<'input'> &
    {
      labelText: string;
      error?: string;
      password?: boolean;
      phoneNumber?: boolean;
    }

const UITextInput: React.FC<InputProps> =
    ({
       labelText,
       error,
       password,
       phoneNumber,
       ...rest
     }) => {

      return (
          <div className={styles.uiInput}>
            <label>
              <div className={styles.labelText}>{error ? error : labelText}</div>
              {!phoneNumber ?
                  <input className={error && styles.errored} type={password ? 'password' : 'text'} {...rest}/>
                : <PhoneInput className={error && styles.errored} {...rest}/>
              }
            </label>
          </div>
      );
    };

export default UITextInput;