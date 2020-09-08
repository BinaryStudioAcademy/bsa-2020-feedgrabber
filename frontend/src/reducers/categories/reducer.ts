import {loadCategoriesRoutine} from "../../sagas/categories/routines";
import {IAppState} from "../../models/IAppState";

const initialState = {
    list: [] as string[],
    isLoading: false
};

export interface ICategorie {
    id: string;
    title: string;
    companyName: string;
}

export interface ICategoriesState {
    list: string[];
    isLoading: boolean;
}

const categoriesReducer = (state: IAppState["categories"] = initialState, {type, payload}) => {
    switch (type) {
        case loadCategoriesRoutine.SUCCESS:
            return {
                list: payload,
                isLoading: false
            };
        case loadCategoriesRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadCategoriesRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default categoriesReducer;
