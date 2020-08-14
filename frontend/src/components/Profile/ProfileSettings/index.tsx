import React, {FunctionComponent} from 'react';
import {Grid, Form, Header, Icon, Checkbox, Dropdown} from "semantic-ui-react";
import './styles.sass';
import {IAppState} from "../../../models/IAppState";
import {connect} from "react-redux";
import {IUserInfo} from "../../../models/user/types";
import {
  deleteInvitationRoutine,
  generateInvitationRoutine,
  loadInvitationRoutine
} from "../../../sagas/invitation/routines";
import InvitationLink from "../../InvitationLink";

export interface IUserSettings {
  id: string;
  language: string;
  enableNotifications: boolean;
}

interface IProfileSettingsProps {
  settings: IUserSettings;
  user: IUserInfo;
  invitationLoading?: boolean;
  invitationLink?: string | null;

  loadInvitation(): void;
  generateInvitation(): void;
  deleteInvitation(): void;
}

const languages = [
  {
    key: 'English',
    text: 'English',
    value: 'English',
    image: {avatar: true, src: 'https://www.countryflags.io/gb/flat/64.png'}
  },
  {
    key: 'Ukrainian',
    text: 'Ukrainian',
    value: 'Ukrainian',
    image: {avatar: true, src: 'https://www.countryflags.io/ua/flat/64.png'}
  }
];

const ProfileSettings: FunctionComponent<IProfileSettingsProps> = (
  {
    settings,
    user,
    invitationLoading,
    invitationLink,
    loadInvitation,
    generateInvitation,
    deleteInvitation
  }
) => {
  return (
    <Grid container textAlign="left" className={"settings-card"}>
      <Grid.Column>
        <Form>
          <Header as='h4'>
            <Icon name='translate'/>
            <Header.Content>Language settings</Header.Content>
          </Header>
          <br/>
          <Dropdown
            placeholder='Preferred language'
            closeOnBlur
            selection
            value={settings.language}
            options={languages}
            className='icon'
          />
          <br/>
          <Header as='h4'>
            <Icon name='bell'/>
            <Header.Content>Notifications</Header.Content>
          </Header>
          <br/>
          <Checkbox checked={settings.enableNotifications} toggle label={"Turn on notifications"}/>
          <br/>
          {user?.role === "company_owner" && (
            <InvitationLink
              invitationLink={invitationLink}
              invitationLoading={invitationLoading}
              loadInvitation={loadInvitation}
              generateInvitation={generateInvitation}
              deleteInvitation={deleteInvitation}
            />
          )}
        </Form>
      </Grid.Column>
    </Grid>
  );
};

ProfileSettings.defaultProps = {
  settings: {
    id: '07944172-105f-4289-a7bf-3f23a374c15f',
    language: 'English',
    enableNotifications: true
  }
};

const mapState = (state: IAppState) => ({
  user: state.user.info,
  invitationLoading: state.invitation.isLoading,
  invitationLink: state.invitation.link
});

const mapDispatchToProps = {
  loadInvitation: loadInvitationRoutine,
  generateInvitation: generateInvitationRoutine,
  deleteInvitation: deleteInvitationRoutine
};

export default connect(mapState, mapDispatchToProps)(ProfileSettings);
