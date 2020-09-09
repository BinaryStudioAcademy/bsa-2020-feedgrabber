import React from "react";
import styles from './styles.module.sass';
import {Menu} from "semantic-ui-react";
import {redirectToMain} from "../../helpers/subdomain.helper";
import {history} from "../../helpers/history.helper";

interface IErrorPageProps {
  location: {
    state?: { text?: string };
  };
}

const ErrorPage: React.FC<IErrorPageProps> = props => {
  const {location} = props;
  return <>
    <section className='landing_face'>
      <Menu fixed='top'>
        <Menu.Item onClick={() => {
          history.push('/layout');
          redirectToMain();
        }} header>
          <img
              style={{marginRight: 10, borderRadius: 10, padding: 5}}
              src={require('../../assets/images/icon_bg.jpg')}
              alt='Logo'
          />
          FeedGrabber
        </Menu.Item>
        <Menu.Item position='right' onClick={() => {
          history.push('/auth');
          redirectToMain();
        }}>
          Sign In
        </Menu.Item>
      </Menu>
      <div>
        <div className={styles.cont_principal + ' ' + styles.cont_error_active}>
          <div className={styles.cont_error}>
            <h1>Oops...</h1>
            <p>{location?.state?.text ?? "The Page you're looking for isn't here."}</p>
          </div>
          <div className={styles.cont_aura_1}/>
          <div className={styles.cont_aura_2}/>
        </div>
      </div>
    </section>
  </>;
};

export default ErrorPage;