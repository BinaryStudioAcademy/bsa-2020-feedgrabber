/* eslint-disable */
import React from "react";
import styled, {css, keyframes} from "styled-components";
import {theme} from "./Theme";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Typography from "./Typography";
import Button from "./Button";
import img from "./../../../assets/images/bg-pattern.jpg";
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

const Root = styled.div`
  background-image: url(${img});
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
`;

const Container = styled.div`
  border-radius: 10px;
  background-color: ${theme.color.white};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 560px;
  text-align: center;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: ${theme.transition.base({el: "all", speed: "0.6"})};
`;

const ShowSignUpContainer = keyframes`
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
`;

const SignUpContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  z-index: ${props => (props.signUpActive ? 5 : 1)};
  transform: ${props =>
  props.signUpActive ? "translateX(100%)" : "translateX(0)"};
  opacity: ${props => (props.signUpActive ? 1 : 0)};
  animation: ${props =>
  props.signUpActive
    ? css`
          ${ShowSignUpContainer} 0.6
        `
    : "none"};
`;

const SignInContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  z-index: 2;
  transform: ${props =>
  props.signUpActive ? "translateX(100%)" : "translateX(0)"};
`;

const StyledForm = css`
  background-color: ${theme.color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;
const SignUpFormStyled = styled(SignUpForm)`
  ${StyledForm}
`;

const SignInFormStyled = styled(SignInForm)`
  ${StyledForm}
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: ${theme.transition.base({el: "transform", speed: "0.6"})};
  z-index: 100;
  transform: ${props =>
  props.signUpActive ? "translateX(-100%)" : "translateX(0)"};
`;

const Overlay = styled.div`
  background: #ff416c;
  background: linear-gradient(to right, #9965f4 20%, #0000d6 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: ${props =>
  props.signUpActive ? "translateX(50%)" : "translateX(0)"};
  transition: ${theme.transition.base({el: "transform", speed: "0.6"})};
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: "translateX(0)";
  transition: ${theme.transition.base({el: "transform", speed: "0.6"})};
`;

const OverlayPanelLeft = styled(OverlayPanel)`
  transform: ${props =>
  props.signUpActive ? "translateX(-0)" : "translateX(-20%)"};
`;
const OverlayPanelRight = styled(OverlayPanel)`
  right: 0;
  transform: ${props =>
  props.signUpActive ? "translateX(20%)" : "translateX(0)"};
`;

const StyledMenu = styled(Menu)`
  background-color: transparent !important;
  backdrop-filter: blur(10px);
  box-shadow: none;
  font-family: 'Quicksand-Bold', sans-serif !important;
  font-size: 1.5rem !important;
`;

class SignForm extends React.Component {
  constructor(props) {
    super(props);
    const isActive = this.props.location.signUpActive ?? false;
    this.state = {
      signUpActive: isActive
    };

    this.toggleSignPanel = this.toggleSignPanel.bind(this);
  }

  toggleSignPanel() {
    this.setState((prevState) => {
      return {
        signUpActive: !prevState.signUpActive
      };
    });
  }

  render() {
    const t = this.props.t;
    return (
      <>
        <StyledMenu fixed='top'>
          <Menu.Item as={Link} to='/' header style={{padding: '10px 27px 10px 27px'}}>
            <img
              style={{marginRight: 10, borderRadius: 10, padding: 5}}
              src={require('../../../assets/images/icon_bg.jpg')}
              alt='Logo'
            />
            FeedGrabber
          </Menu.Item>
        </StyledMenu>
        <Root>
          <Container>
            <SignUpContainer signUpActive={this.state.signUpActive}>
              <SignUpFormStyled/>
            </SignUpContainer>

            <SignInContainer signUpActive={this.state.signUpActive}>
              <SignInFormStyled/>
            </SignInContainer>

            <OverlayContainer signUpActive={this.state.signUpActive}>
              <Overlay signUpActive={this.state.signUpActive}>
                <OverlayPanelRight signUpActive={this.state.signUpActive}>
                  <Typography fontWeight="bold" variant="h4" color="white">
                    {t("Welcome Back!")}
                  </Typography>
                  <Typography variant="body" color="white">
                    {t("To keep connected")}
                  </Typography>
                  <Button
                    onClick={this.toggleSignPanel}
                    variant="transparent"
                    marginTop="1.17rem"
                  >
                    {t("Sign Up")}
                  </Button>
                </OverlayPanelRight>

                <OverlayPanelLeft signUpActive={this.state.signUpActive}>
                  <Typography fontWeight="bold" variant="h4" color="white">
                    {t("Hello, Friend!")}
                  </Typography>
                  <Typography variant="body" color="white">
                    {t("Enter your personal details")}
                  </Typography>
                  <Button
                    onClick={this.toggleSignPanel}
                    variant="transparent"
                    marginTop="1.17rem"
                  >
                    {t("Sign In")}
                  </Button>
                </OverlayPanelLeft>
              </Overlay>
            </OverlayContainer>
          </Container>
        </Root>
      </>
    );
  }
}

export default withTranslation()(SignForm);
