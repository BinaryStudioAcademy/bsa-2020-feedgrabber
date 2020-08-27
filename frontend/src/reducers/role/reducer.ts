import {IAppState} from "../../models/IAppState";
import {
    changeRoleRoutine,
    loadShortRolesRoutine, setIsChangingRoutine,
    setIsLoadingRoutine,
    toggleModalRoutine
} from "../../sagas/role/routines";
import {IRoleShort} from "../../models/role/Role";

export interface IRoleState {
    companyRoles: IRoleShort[];
    isChangeRoleModalOpen: boolean;
    isLoading: boolean;
    isChanging: boolean;
}

const initialState: IRoleState = {
    companyRoles: [],
    isChangeRoleModalOpen: false,
    isLoading: false,
    isChanging: false
};

const roleReducer = (state: IAppState['role'] = initialState, {type, payload}) => {
    switch (type) {
        case loadShortRolesRoutine.SUCCESS:
            return {
                ...state,
                companyRoles: [...payload],
                isLoading: false
            };
        case loadShortRolesRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case setIsLoadingRoutine.TRIGGER:
            return {
                ...state,
                isLoading: payload.isLoading
            };
        case setIsChangingRoutine.TRIGGER:
            return {
                ...state,
                isChanging: payload.isChanging
            };
        case toggleModalRoutine.TRIGGER:
            return {
                ...state,
                isChangeRoleModalOpen: !state.isChangeRoleModalOpen
            };
        case changeRoleRoutine.SUCCESS:
            return {
                ...state,
                isChanging: false
            };
        case changeRoleRoutine.FAILURE:
            return {
                ...state,
                isChanging: false
            };
        default:
            return state;
    }
};

export default roleReducer;
