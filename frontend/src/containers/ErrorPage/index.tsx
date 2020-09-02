import React from "react";
import styles from './styles.module.sass';
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

const ErrorPage: React.FC = () => {
  return <>
    <section className='landing_face  '>
      <Menu fixed='top'>
        <Menu.Item as={Link} to='/layout' header>
          <img
              className='logo'
              src={require('../../assets/images/icon_bg.jpg')}
              alt='Logo'
          />
          FeedGrabber
        </Menu.Item>
        <Menu.Item position='right' as={Link} to='/auth'>
          Sign In
        </Menu.Item>
      </Menu>
      <div>
        <div className={styles.cont_principal + ' ' + styles.cont_error_active}>
          <div className={styles.cont_error}>

            <h1>Oops</h1>
            <p>{"The Page you're looking for isn't here."}</p>
          </div>
          <div className={styles.cont_aura_1}/>
          <div className={styles.cont_aura_2}/>
        </div>
      </div>
    </section>
  </>;
};

export default ErrorPage;