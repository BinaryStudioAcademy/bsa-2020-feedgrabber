import React, {ChangeEvent, FC, useState} from 'react';
import {Button, Form, Image} from "semantic-ui-react";
import {Formik} from 'formik';
import * as yup from 'yup';
import {connect, ConnectedProps} from "react-redux";
import {IAppState} from "../../../models/IAppState";
import {editUserProfileRoutine, getUserRoutine, uploadUserAvatarRoutine} from "../../../sagas/auth/routines";
import ImageCropModal from "../../ImageCropModal";
import UIButton from "../../UI/UIButton";
import UITextInput from "../../UI/UITextInput/UITextInput";
import styles from './styles.module.sass';

const validationSchema = yup.object().shape({
  userName: yup
      .string()
      .required("Username is required")
      .min(3, "Username must contains at least 3 characters"),
  firstName: yup
      .string(),
  lastName: yup
      .string(),
  phoneNumber: yup
      .string()
      .length(13, "Please enter valid phone number 099-999-99-99")
      .matches(/[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}/, "Please enter valid phone number 099-999-99-99")
});

const defaultAvatar =
    "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const ProfileInfo: FC<ProfileInfoProps> = props => {
  const {user, save, uploadImage, isLoading} = props;

  const [src, setSource] = useState<string | ArrayBuffer>(undefined);
  const [fileName, setFileName] = useState('avatar');

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
                    basic >
              Update
              <input name="image" type="file" onChange={onSelectFile} hidden/>
            </Button>
            <Button content='Delete'
                    size='small'
                    basic
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
              userName: user.userName,
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              phoneNumber: user.phoneNumber || ''
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              save({
                id: user.id,
                userName: values.userName,
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                avatar: user.avatar
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
              setFieldError
            }) => (
              <Form name="userForm" onSubmit={handleSubmit}>
                {/* <UITextInput labelText={'Username'}*/}
                {/*             placeholder={'Type your username...'}*/}
                {/*             name='userName'*/}
                {/*             value={values.userName}*/}
                {/*             error={touched.userName && errors.userName}*/}
                {/*             onChange={handleChange}*/}
                {/*             onBlur={handleBlur}*/}
                {/*             onClick={() => setFieldError('userName', null)}*/}
                {/* />*/}
                <UITextInput labelText={'First Name'}
                             placeholder={'Type your first name...'}
                             name='firstName'
                             value={values.firstName}
                             onChange={handleChange}
                             error={(touched.firstName && errors.firstName) ?? null}
                             onBlur={handleBlur}
                             onClick={() => setFieldError('firstName', null)}
                />
                <UITextInput labelText={'Last Name'}
                             placeholder={'Type your last name...'}
                             name='lastName'
                             value={values.lastName}
                             onChange={handleChange}
                             error={touched.lastName && errors.lastName}
                             onBlur={handleBlur}
                             onClick={() => setFieldError('lastName', null)}
                />
                <UITextInput labelText={'Phone'}
                             placeholder={'099-999-99-99'}
                             name='phoneNumber'
                             value={values.phoneNumber}
                             onChange={handleChange}
                             error={touched.phoneNumber && errors.phoneNumber}
                             onBlur={handleBlur}
                             onClick={() => setFieldError('phoneNumber', null)}
                />
                <UIButton disabled={!isValid}
                          submit
                          title={'Save'}/>

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
  pullUser: getUserRoutine,
  save: editUserProfileRoutine,
  uploadImage: uploadUserAvatarRoutine
};

const connector = connect(mapState, mapDispatch);

type ProfileInfoProps = ConnectedProps<typeof connector>;

export default connector(ProfileInfo);
