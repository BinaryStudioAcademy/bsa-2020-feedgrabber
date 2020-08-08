import {IRegistrationRequest} from "./IRegistrationRequest";
import {SET_USER, USER_REGISTRATION} from "./actionTypes";

export function register(registrationRequest: IRegistrationRequest): any {
    return {
        type: USER_REGISTRATION,
        payload: {
            registrationRequest
        }
    };
}

export function setUserAction(user: object) {
    return {
        type: SET_USER,
        payload: {
            user
        }
    };
}
