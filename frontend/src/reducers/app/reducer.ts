import {IAppState} from "../../models/IAppState";
import {setFloatingMenuPos, toggleMenuRoutine} from "../../sagas/app/routines";

const initialState = {
    showMenu: true,
    floatingMenuPos: 0
};

export interface IAdditionalState {
    showMenu: boolean;
    floatingMenuPos: number;
}

const appReducer = (state: IAppState['app'] = initialState, {type, payload}) => {
    if (type === toggleMenuRoutine.TRIGGER) {
        return {
            ...state,
            showMenu: payload
        };
    }
    if (type === setFloatingMenuPos.TRIGGER) {
        return {
            ...state,
            floatingMenuPos: state.floatingMenuPos === 0 ? payload - 20 :
                payload > state.floatingMenuPos ? payload - 180 : payload - 20
        };
    }
    return state;
};

export default appReducer;
