import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Button, Form, Image} from "semantic-ui-react";
import {Formik} from 'formik';
import * as yup from 'yup';
import {connect, ConnectedProps} from "react-redux";
import {IAppState} from "../../../models/IAppState";
import {getUserRoutine} from "../../../sagas/auth/routines";
import ImageCropModal from "../../ImageCropModal";
import UIButton from "../../UI/UIButton";
import UITextInput from "../../UI/UITextInput/UITextInput";
import styles from './styles.module.sass';
import {editUserProfileRoutine, uploadUserAvatarRoutine} from "../../../sagas/user/routines";
import {useTranslation} from "react-i18next";

const validationSchema = yup.object().shape({
  firstName: yup
      .string()
      .min(1, "Too short first name")
      .max(40, "Too long first name")
      .matches(/^\w([A-Za-zА-Яа-я.])([ \-`,]?[A-Za-zА-Яа-я.])*$/,
          "First name is invalid"),
  lastName: yup
      .string()
      .min(1, "Too short last name")
      .max(40, "Too long last name")
      .matches(/^\w([A-Za-zА-Яа-я.])([ \-`,]?[A-Za-zА-Яа-я.])*$/,
          "Last name is invalid"),
  phoneNumber: yup
      .string()
      .min(7, "Too short phone number")
      .max(20, "Too long phone number")
});

const defaultAvatar =
    "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const ProfileInfo: FC<ProfileInfoProps> =
    ({
       user,
       save,
       isLoading,
       uploadImage,
       getUser
     }) => {
      useEffect(() => getUser, [getUser]);
      const [src, setSource] = useState<string | ArrayBuffer>(undefined);
      const [fileName, setFileName] = useState('avatar');
      const [t] = useTranslation();

      const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener(
              'load',
              () => setSource(reader.result),
              false
          );
          const file = e.target.files[0];
          setFileName(file.name);
          reader.readAsDataURL(file);
        }
      };
      return (
          !isLoading && !!user &&
          <>
            <Image centered
                   src={user?.avatar ?? defaultAvatar}
                   size={"small"} circular
            />
            <div className={styles.buttons}>
              <div>
                <Button size='small'
                        as='label'
                        basic>
                  {t("Update")}
                  <input name="image" type="file" onChange={onSelectFile} hidden/>
                </Button>
                <Button content='Delete'
                        size='small'
                        basic
                        onClick={() => uploadImage()}
                />
              </div>
            </div>
            {src && (
                <ImageCropModal
                    close={() => setSource(undefined)}
                    src={src}
                    fileName={fileName}
                    save={uploadImage}
                />
            )}

            <Formik
                enableReinitialize
                initialValues={{
                  firstName: user.firstName || '',
                  lastName: user.lastName || '',
                  phoneNumber: user.phoneNumber || ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, helpers) => {
                  save({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber
                  });
                }
                }
            >
              {({
                  errors,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValid,
                  touched,
                  setFieldError,
                  setFieldValue
                }) => (
                  <Form name="userForm" onSubmit={handleSubmit}>
                    <UITextInput labelText={t('First Name')}
                                 placeholder={'Type your first name...'}
                                 name='firstName'
                                 value={values.firstName}
                                 onChange={handleChange}
                                 error={touched.firstName && errors.firstName}
                                 onBlur={handleBlur}
                                 onClick={() => setFieldError('firstName', null)}
                    />
                    <UITextInput labelText={t('Last Name')}
                                 placeholder={'Type your last name...'}
                                 name='lastName'
                                 value={values.lastName}
                                 onChange={handleChange}
                                 error={touched.lastName && errors.lastName}
                                 onBlur={handleBlur}
                                 onClick={() => setFieldError('lastName', null)}
                    />
                    <UITextInput labelText={t('Phone')}
                                 placeholder={'+380 99 999 99 99'}
                                 name='phoneNumber'
                                 value={values.phoneNumber}
                                 onChange={value => setFieldValue('phoneNumber', value)}
                                 error={touched.phoneNumber && errors.phoneNumber}
                                 onBlur={handleBlur}
                                 onClick={() => setFieldError('phoneNumber', null)}
                                 phoneNumber
                    />
                    <UIButton disabled={!!(errors.firstName || errors.lastName || errors.phoneNumber)}
                              submit
                              title={t('Save')}/>

                  </Form>
              )}
            </Formik>
          </>
      );
    };

const mapState = (state: IAppState) => ({
  user: state.user.info,
  isLoading: state.user.isLoading ?? true
});

const mapDispatch = {
  getUser: getUserRoutine,
  save: editUserProfileRoutine,
  uploadImage: uploadUserAvatarRoutine
};

const connector = connect(mapState, mapDispatch);

type ProfileInfoProps = ConnectedProps<typeof connector>;

export default connector(ProfileInfo);
