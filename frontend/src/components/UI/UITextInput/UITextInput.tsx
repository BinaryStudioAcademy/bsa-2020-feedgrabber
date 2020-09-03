import React from 'react';
import styles from './styles.module.sass';
import PhoneInput from 'react-phone-input-2';

type InputProps = React.ComponentProps<'input'> &
    {
      labelText: string;
      error?: string;
      password?: boolean;
      phoneNumber?: boolean;
      onChange: any;
      value: string;
    }

const UITextInput: React.FC<InputProps> =
    ({
       labelText,
       error,
       password,
       phoneNumber,
       onChange,
        value,
       ...rest
     }) => {

      return (
          <div className={styles.uiInput}>
            <label>
              <div className={styles.labelText}>{error ? error : labelText}</div>
              {!phoneNumber ?
                  <input className={error && styles.errored}
                         type={password ? 'password' : 'text'}
                         onChange={onChange}
                         value={value}
                         {...rest}/>
                  : <PhoneInput inputClass={error && styles.errored}
                                specialLabel={null}
                                prefix={'+'}
                                placeholder={'+38 (099) 999 99 99'}
                                value={value}
                                onChange={onChange}/>
              }
            </label>
          </div>
      );
    };

export default UITextInput;