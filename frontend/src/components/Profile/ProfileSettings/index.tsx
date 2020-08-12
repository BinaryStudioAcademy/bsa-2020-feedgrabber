import React, {FunctionComponent, useRef, useState} from 'react';
import {Grid, Form, Header, Icon, Checkbox, Dropdown, Input} from "semantic-ui-react";
import './styles.sass';
import {IAppState} from "../../../models/IAppState";
import {connect} from "react-redux";
import {IUserInfo} from "../../../models/user/types";

export interface IUserSettings {
  id: string;
  language: string;
  enableNotifications: boolean;
}

interface IProfileSettingsProps {
  settings: IUserSettings;
  user: IUserInfo;
}

const ProfileSettings: FunctionComponent<IProfileSettingsProps> =
  ({settings, user}) => {
    const [copied, setCopied] = useState(false);
    const input = useRef(null);

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

    const copyToClipboard = e => {
      input.current.select();
      document.execCommand('copy');
      e.target.focus();
      setCopied(true);
    };

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
              <>
                <Header as='h4'>
                  <Icon name='pin'/>
                  <Header.Content>Invite</Header.Content>
                </Header>
                <Input
                  className="form-field"
                  value="link"
                  readonly
                  action={{
                    color: 'blue',
                    labelPosition: 'right',
                    icon: 'copy',
                    content: 'Copy',
                    onClick: copyToClipboard
                  }}
                  ref={input}
                />
                <br />
                <br />
                {copied && (
                  <span>
                    <Icon color="green" name="copy"/>
                    Copied
                  </span>
                )}
              </>
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
  user: state.user.info
});

export default connect(mapState)(ProfileSettings);
