import {all, call, put, takeEvery} from 'redux-saga/effects';
import apiClient from '../../helpers/apiClient';
import {IUserInfo, IUserSettings, IUserShort} from "../../models/user/types";
import {IGeneric} from "../../models/IGeneric";
import {toastr} from 'react-redux-toastr';
import {
  getUserRoutine,
  resetPasswordRoutine,
  sendEmailToResetPasswordRoutine,
  getUserShortRoutine
} from "../auth/routines";
import {history} from "../../helpers/history.helper";
import {
  editUserProfileRoutine, getUserSettingsRoutine,
  updateUserPasswordRoutine, updateUserSettingsRoutine,
  updateUserUsernameRoutine,
  uploadUserAvatarRoutine
} from "./routines";
import localeProvider from "../../helpers/localeProvider";

function* getUser() {
  try {
    const res: IGeneric<IUserInfo> = yield call(apiClient.get, `/api/user`);
    yield put(getUserRoutine.success(res.data.data));
  } catch (error) {
    yield put(getUserRoutine.failure(error));
  }
}

function* uploadAvatar(action) {
  try {
    if (action.payload) {
      const formData = new FormData();
      formData.append('image', action.payload);

      const image = yield call(apiClient.post, '/api/image', formData);
      const res: IGeneric<IUserInfo> = yield call(apiClient.patch, `/api/user/editAvatar?imageId=${image.data.id}`);

      yield put(uploadUserAvatarRoutine.success(res.data.data));
      toastr.success('Avatar updated');
    } else {
      const res: IGeneric<IUserInfo> = yield call(apiClient.patch, '/api/user/editAvatar');
      yield put(uploadUserAvatarRoutine.success(res.data.data));
      toastr.success('Avatar deleted');
    }
  } catch (e) {
    yield put(uploadUserAvatarRoutine.failure(e));
    toastr.error("Unable to update image");
  }
}

function* editUserProfile(action) {
  try {
    const res: IGeneric<IUserInfo> = yield call(apiClient.patch, '/api/user/editProfile', action.payload);
    yield put(editUserProfileRoutine.success(res.data.data));
    toastr.success('Successfully updated');
  } catch (error) {
    toastr.error('Failed to update');
  }
}

function* getUserShort(action) {
  try {
    const res: IGeneric<IUserShort> =
        yield call(apiClient.get,
            `/api/user/short?email=${action.payload.email}&companyId=${action.payload.companyId}`);
    yield put(getUserShortRoutine.success(res.data.data));
  } catch (error) {
    yield put(getUserShortRoutine.failure(error));
  }

}

function* sendEmailPassReset(action) {
  try {
    // payload: {companyId, userEmail}
    yield call(apiClient.post, '/api/user/email/reset', action.payload);
    yield call(toastr.info, ("Check your email"));
  } catch (e) {
    yield call(toastr.error, ("Something went wrong, try again"));
    console.log(e);
  }
}

function* passwordReset(action) {
  try {
    // payload: {token, password}
    yield call(apiClient.post, '/api/user/reset', action.payload);
    yield call(toastr.success, ("Your password was updated!"));
  } catch (e) {
    yield call(toastr.error, ("Something went wrong, try again"));
    console.log(e);
  }
  yield call(history.push, '/auth');
}

function* updateUsername(action) {
  try {
    const res: IGeneric<IUserInfo> = yield call(apiClient.patch, '/api/user/updateUsername', action.payload);
    yield put(updateUserUsernameRoutine.success(res.data.data));
    toastr.success('Username updated successfully');
  } catch (error) {
    toastr.error(error.response.data.error);
  }
}

function* updatePassword(action) {
  try {
    const res: IGeneric<IUserInfo> = yield call(apiClient.patch, '/api/user/updatePassword', action.payload);
    yield put(updateUserPasswordRoutine.success(res.data.data));
    toastr.success('Password updated successfully');
  } catch (error) {
    if (error.response?.status === 404) {
      toastr.error('Wrong password');
    } else {
      toastr.error('Unable to update password');
    }
  }
}

function* getSettings() {
  try {
    const res: IGeneric<IUserSettings> = yield call(apiClient.get, '/api/user/settings');
    localeProvider.setLocale(res.data.data.language);
    yield put(getUserSettingsRoutine.success(res.data.data));
  } catch (error) {
    toastr.error('Unable to load settings');
  }
}

function* updateSettings(action) {
  try {
    const res: IGeneric<IUserSettings> = yield call(apiClient.post, '/api/user/settings', action.payload);
    yield put(getUserSettingsRoutine.success(res.data.data));
  } catch (error) {
    toastr.error('Unable to load settings');
  }
}

export default function* userSagas() {
  yield all([
    yield takeEvery(getUserRoutine.TRIGGER, getUser),
    yield takeEvery(sendEmailToResetPasswordRoutine.TRIGGER, sendEmailPassReset),
    yield takeEvery(resetPasswordRoutine.TRIGGER, passwordReset),
    yield takeEvery(editUserProfileRoutine.TRIGGER, editUserProfile),
    yield takeEvery(uploadUserAvatarRoutine.TRIGGER, uploadAvatar),
    yield takeEvery(getUserShortRoutine.TRIGGER, getUserShort),
    yield takeEvery(updateUserPasswordRoutine.TRIGGER, updatePassword),
    yield takeEvery(updateUserUsernameRoutine.TRIGGER, updateUsername),
    yield takeEvery(getUserSettingsRoutine.TRIGGER, getSettings),
    yield takeEvery(updateUserSettingsRoutine.TRIGGER, updateSettings)
  ]);
}
