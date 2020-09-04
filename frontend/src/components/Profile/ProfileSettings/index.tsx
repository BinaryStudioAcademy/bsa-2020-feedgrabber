import React, {FunctionComponent, useEffect} from 'react';
import {Grid, Form, Header, Icon, Checkbox, Dropdown} from "semantic-ui-react";
import './styles.sass';
import {IAppState} from "../../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {getUserSettingsRoutine, updateUserSettingsRoutine} from "../../../sagas/user/routines";
import { useTranslation } from 'react-i18next';

const languages = [
  {
    key: 'English',
    text: 'English',
    value: 'english',
    image: {avatar: true, src: 'https://www.countryflags.io/gb/flat/64.png'}
  },
  {
    key: 'Ukrainian',
    text: 'Українська',
    value: 'ukrainian',
    image: {avatar: true, src: 'https://www.countryflags.io/ua/flat/64.png'}
  }
];

const ProfileSettings: FunctionComponent<IProfileSetting> = (
    {
      settings,
      updateSettings,
      getSettings
    }
) => {
  useEffect(() => {
   !settings && getSettings();
  }, [getSettings, settings]);

  const [t, i18n] = useTranslation();

  const handleLanguageChange = (event, data) => {
    updateSettings({...settings, language: data.value});
    i18n.changeLanguage(data.value);
  };

  return (
      <>{
        settings &&
        <Grid container textAlign="left" className={"settings-card"}>
          <Grid.Column>
            <Form>
              <Header as='h4'>
                <Icon name='translate'/>
                <Header.Content>{t("Language settings")}</Header.Content>
              </Header>
              <br/>
              <Dropdown
                  placeholder='Preferred language'
                  closeOnBlur
                  selection
                  value={settings.language}
                  options={languages}
                  className='icon'
                  onChange={handleLanguageChange}
              />
              <br/>
              <Header as='h4'>
                <Icon name='bell outline'/>
                <Header.Content>{t("Notifications")}</Header.Content>
              </Header>
              <br/>
              <Checkbox checked={settings.enableNotifications}
                        toggle
                        label={t("Turn on notifications")}
                        onChange={(event, data) => {
                          updateSettings({...settings, enableNotifications: data.checked});
                        }}/>
            </Form>
          </Grid.Column>
        </Grid>
      }</>
  );
};

const mapState = (state: IAppState) => ({
  settings: state.user.settings
});

const mapDispatchToProps = {
  getSettings: getUserSettingsRoutine,
  updateSettings: updateUserSettingsRoutine
};

const connector = connect(mapState, mapDispatchToProps);

type IProfileSetting = ConnectedProps<typeof connector>;

export default connector(ProfileSettings);
