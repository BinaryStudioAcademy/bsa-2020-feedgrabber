import {createRoutine} from "redux-saga-routines";

export const uploadUserAvatarRoutine = createRoutine('USER:UPLOAD_AVATAR');
export const editUserProfileRoutine = createRoutine('USER:EDIT_USER');
export const updateUserPasswordRoutine = createRoutine('USER:UPDATE_PASSWORD');
export const updateUserUsernameRoutine = createRoutine('USER:UPDATE_USERNAME');
export const getUserSettingsRoutine = createRoutine('USER:GET_SETTINGS');
export const updateUserSettingsRoutine = createRoutine('USER:UPDATE_SETTINGS');