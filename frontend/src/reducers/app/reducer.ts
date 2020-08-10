import {IAppState} from "../../models/IAppState";
import {TOGGLE_MENU} from "./actions";

const initialState = {
    showMenu: false
};

const appReducer = (state: IAppState['app'] = initialState, {type, payload}) => {
    if (type === TOGGLE_MENU) {
        return {
            ...state,
            showMenu: !state.showMenu
        };
    }
    return state;
};

export default appReducer;
