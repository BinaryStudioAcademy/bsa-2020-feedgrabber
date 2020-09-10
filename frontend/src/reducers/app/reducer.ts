import {IAppState} from "../../models/IAppState";
import {setExpandLanguageRoutine, setFloatingMenuPos, toggleMenuRoutine} from "../../sagas/app/routines";
import {loadFormRoutine} from "../../sagas/sections/routines";

const initialState = {
    showMenu: true,
    expandLanguage: false,
    floatingMenuPos: 0
};

export interface IAdditionalState {
    showMenu: boolean;
    expandLanguage: boolean;
    floatingMenuPos: number;
}

const appReducer = (state: IAppState['app'] = initialState, {type, payload}) => {
    if (type === toggleMenuRoutine.TRIGGER) {
        console.log(1);
        return {
            ...state,
            showMenu: payload,
            expandLanguage: false
        };
    }
    if (type === setFloatingMenuPos.TRIGGER) {
        return {
            ...state,
            floatingMenuPos: payload
        };
    }
    if (type === loadFormRoutine.TRIGGER) {
        return {
            ...state,
            floatingMenuPos: 0
        };
    }
    if (type === setExpandLanguageRoutine.TRIGGER) {
        return {
            ...state,
            expandLanguage: payload
        };
    }
    return state;
};

export default appReducer;
