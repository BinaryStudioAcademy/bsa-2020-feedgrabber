import React from 'react';
import './style.sass';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import {useTranslation} from "react-i18next";

export type LandingProps = {
  loggedIn: boolean;
};

const toSignUp = {
  pathname: "/auth",
  signUpActive: true
};

const LandingPage: React.FunctionComponent<LandingProps> = () => {
  const [t] = useTranslation();
  return (
    <>
      <section className='landing_face'>
        <Menu fixed='top'>
          <Menu.Item as={Link} to='/' header>
            <img
              className='logo'
              src={require('../../assets/images/icon_bg.jpg')}
              alt='Logo'
            />
            FeedGrabber
          </Menu.Item>
          <Menu.Item position='right' as={Link} to='/auth'>
            {t("Sign In")}
          </Menu.Item>
        </Menu>
        <div className='face'>
          <div className='face_card'>
            <h2 className='face_card_header'>
              {t("Inspire employees to become better as you see it")}
            </h2>
            <div className='face_card_body'>
              {t("Reviews = opportunity")}
            </div>
            <div className='face_card_actions'>
              <Link to={toSignUp}>
                <Button>{t("Make some fire!")}</Button>
              </Link>
            </div>
          </div>
          <div className='face_main'>
            <img
              src={require('../../assets/images/standing-8@2x.png')}
              alt='Attractive'
            />
          </div>
        </div>
      </section>
    </>
  );
};
// add some more info

export default LandingPage;
