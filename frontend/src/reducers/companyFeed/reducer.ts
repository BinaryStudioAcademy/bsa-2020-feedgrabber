import {ICompanyFeedItem} from "../../models/companyFeed/ICompanyFeedItem";
import {IAppState} from "../../models/IAppState";
import {
    loadCompanyFeedRoutine,
    loadCompanyFeedItemRoutine,
    saveCompanyFeedItemRoutine,
    createCompanyFeedItemRoutine,
    setCompanyFeedPaginationRoutine, applyReactionRoutine
} from "../../sagas/companyFeed/routines";
import {IPaginationInfo} from "../../models/IPaginationInfo";

export interface ICompanyFeedState {
    list: IPaginationInfo<ICompanyFeedItem>;
    current: ICompanyFeedItem;
    isLoading: boolean;
    error?: string;
}

const initialState: ICompanyFeedState = {
    list: null,
    current: null,
    isLoading: false,
    error: null
};

const companyFeedReducer = (state: IAppState['companyFeed'] = initialState, {type, payload}) => {
    switch (type) {
        case setCompanyFeedPaginationRoutine.TRIGGER:
            return {
                ...state,
                pagination: payload
            };
        case loadCompanyFeedRoutine.TRIGGER:
        case loadCompanyFeedItemRoutine.TRIGGER:
        case createCompanyFeedItemRoutine.TRIGGER:
        case saveCompanyFeedItemRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadCompanyFeedRoutine.FAILURE:
        case loadCompanyFeedItemRoutine.FAILURE:
        case createCompanyFeedItemRoutine.FAILURE:
        case saveCompanyFeedItemRoutine.FAILURE:
            return {
                ...state,
                isLoading: false
            };
        case loadCompanyFeedRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: payload
            };
        case loadCompanyFeedItemRoutine.SUCCESS:
        case createCompanyFeedItemRoutine.SUCCESS:
            return {
                ...state,
                isLoading: false,
                current: payload
            };
        case applyReactionRoutine.TRIGGER:
            const list = {...state.list};
            console.log(payload);

            if (payload.toAdd) {
                const newsReactions = list.items.filter(r => r.id === payload.newsId)[0].reactions
                    .filter(r => r.emoji === payload.reaction)[0];
                if (newsReactions !== undefined) {
                    newsReactions.reactedUsers.push(payload.user);
                    newsReactions.reactedByCurrentUser = true;
                } else {
                    list.items.filter(r => r.id === payload.newsId)[0]
                        .reactions.push({
                        emoji: payload.reaction,
                        reactedByCurrentUser: true,
                        reactedUsers: [payload.user]
                    });
                }
            } else {
                console.log(payload.newsId);
                const news = list.items.filter(r => r.id === payload.newsId)[0];
                const newsReactions = news.reactions.filter(r => r.emoji === payload.reaction)[0];
                newsReactions.reactedUsers = newsReactions.reactedUsers.filter(r => r.id !== payload.user.id);
                if (newsReactions.reactedUsers.length === 0) {
                    news.reactions = news.reactions.filter(r => r.emoji !== payload.reaction);
                }
                newsReactions.reactedByCurrentUser = false;
            }

            return {
                ...state,
                list: list
            };

        default:
            return state;
    }
};

export default companyFeedReducer;
