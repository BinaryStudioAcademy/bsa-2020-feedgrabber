import {SET_USER } from "./actionTypes";

export default (state: any = {}, action: any) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload.user
            };
        default:
            return state;
    }
};
