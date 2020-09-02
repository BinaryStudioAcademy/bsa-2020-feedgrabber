import {IAppState} from "../../models/IAppState";
import {toggleMenuRoutine} from "../../sagas/app/routines";

const initialState = {
    showMenu: true
};

export interface IAdditionalState {
    showMenu: boolean;
}

const appReducer = (state: IAppState['app'] = initialState, {type, payload}) => {
    if (type === toggleMenuRoutine.TRIGGER) {
        return {
            ...state,
            showMenu: payload
        };
    }
    return state;
};

export default appReducer;
