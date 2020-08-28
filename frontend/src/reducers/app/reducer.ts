import {IAppState} from "../../models/IAppState";
import {toggleMenuRoutine} from "../../sagas/app/routines";

const initialState = {
    showMenu: true
};

export interface IAdditionalState {
    showMenu: boolean;
}

const appReducer = (state: IAppState['app'] = initialState, {type}) => {
    if (type === toggleMenuRoutine.TRIGGER) {
        return {
            ...state,
            showMenu: !state.showMenu
        };
    }
    return state;
};

export default appReducer;
