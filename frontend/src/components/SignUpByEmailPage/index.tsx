import React from "react";
import styled, {css} from "styled-components";
import {theme} from "../AuthForm/SignForm/Theme";
import SignUpByEmailForm from "./SignUpByEmailForm";
import Typography from '../AuthForm/SignForm/Typography';
import img from "./../../assets/images/bg-pattern.jpg";
import {Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
import { IAppState } from "models/IAppState";
import { connect, ConnectedProps } from "react-redux";
import LoaderWrapper from "components/LoaderWrapper";

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

const SignUpContainer = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
  right: 0;
  width: 50%;
  z-index: 5;
  opacity: 1;
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
const SignUpFormStyled = styled(SignUpByEmailForm)`
  ${StyledForm}
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  right: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
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
right: 0;
`;

const StyledMenu = styled(Menu)`
  background-color: transparent !important;
  backdrop-filter: blur(10px);
  box-shadow: none;
  font-family: 'Quicksand-Bold', sans-serif !important;
  font-size: 1.5rem !important;
`;

const SignUpByEmailPage: React.FC<SignUpFormProps> = props => {
    const {company, isLoading} = props;
    return (
        <>
            <StyledMenu fixed='top'>
          <Menu.Item as={Link} to='/layout' header style={{padding: '10px 27px 10px 27px'}}>
            <img
              style={{borderRadius: 10, paddingRight: 10}}
              src={require('./../../assets/images/icon_bg.jpg')}
              alt='Logo'
            />
            FeedGrabber
          </Menu.Item>
        </StyledMenu>
        <Root>
          <Container>
            <LoaderWrapper loading={isLoading}>
                <SignUpContainer>
                    <SignUpFormStyled className="SignUp"
                                    company={company}/>
                </SignUpContainer>
                <OverlayContainer>
                    <Overlay>
                        <OverlayPanel>
                            <Typography fontWeight="bold" variant="h4" color="white">
                                Welcome to <br /> {company?.name}!
                            </Typography>
                            <Typography variant="body" color="white">
                                Enter your personal details and start journey with us ;)
                            </Typography>
                        </OverlayPanel>
                    </Overlay>
                </OverlayContainer>
            </LoaderWrapper>
          </Container>
        </Root>
        </>
    );
};

const mapState = (state: IAppState) => ({
    company: state.company.currentCompany,
    isLoading: state.company.isLoading
});

const connector = connect(mapState);

type SignUpFormProps = ConnectedProps<typeof connector>;

export default connector(SignUpByEmailPage);