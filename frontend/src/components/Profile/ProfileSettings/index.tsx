import React, {FunctionComponent} from 'react';
import {Grid, Form, Header, Icon, Checkbox, Dropdown} from "semantic-ui-react";
import './styles.sass';
import {IAppState} from "../../../models/IAppState";
import {connect} from "react-redux";

export interface IUserSettings {
  id: string;
  language: string;
  enableNotifications: boolean;
}

interface IProfileSettingsProps {
  settings: IUserSettings;
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
    settings
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
});

const mapDispatchToProps = {
};

export default connect(mapState, mapDispatchToProps)(ProfileSettings);
