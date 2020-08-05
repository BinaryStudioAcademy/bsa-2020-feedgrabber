import React from "react";
import "./style.sass";
import { Link, Redirect } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

export type LandingProps = {
  loggedIn: boolean;
};

const LandingPage: React.FunctionComponent<LandingProps> = ({ loggedIn }) => {
  return !loggedIn ? (
    <>
      <section className="landing_face">
        <Menu fixed="top">
          <Menu.Item as={Link} to="/" header>
            <img
              className="logo"
              src={require("../../assets/images/icon_bg.jpg")}
              alt="Logo"
            />
            FeedGrabber
          </Menu.Item>
          <Menu.Item position="right" as={Link} to="/signin">
            Sign In
          </Menu.Item>
        </Menu>
        <div className="face">
          <div className="face_card">
            <h2 className="face_card_header">
              Inspire employees to become better as you see it
            </h2>
            <div className="face_card_body">
              Reviews = opportunity. Start giving professional feedbacks right
              now.
            </div>
            <div className="face_card_actions">
              <Link to={`/signup`}>
                <Button>Make some fire!</Button>
              </Link>
              <Link to={`/signin`}>
                <Button className="signin_btn">Sign in</Button>
              </Link>
            </div>
          </div>
          <div className="face_main">
            <img
              src={require("../../assets/images/standing-8@2x.png")}
              alt="Attractive"
            />
          </div>
        </div>
      </section>
    </>
  ) : (
    <Redirect to="./main"></Redirect>
  );
};
// add some more info

export default LandingPage;
