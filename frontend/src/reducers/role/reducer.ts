import {IAppState} from "../../models/IAppState";
import {
    changeRoleRoutine,
    loadShortRolesRoutine, setIsChangingRoutine,
    setIsLoadingRoutine, setSelectedUserRoutine
} from "../../sagas/role/routines";
import {IRoleShort} from "../../models/role/Role";
import {IUserInfo} from "../../models/user/types";

export interface IRoleState {
    companyRoles: IRoleShort[];
    selectedUser: IUserInfo;
    isLoading: boolean;
    isChanging: boolean;
}

const initialState: IRoleState = {
    companyRoles: [],
    selectedUser: null,
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
        case setSelectedUserRoutine.TRIGGER:
            console.log(payload);
            return {
                ...state,
                selectedUser: payload
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
