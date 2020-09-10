import {ICompanyFeedItem} from "../../models/companyFeed/ICompanyFeedItem";
import {IAppState} from "../../models/IAppState";
import {
    loadCompanyFeedRoutine,
    loadCompanyFeedItemRoutine,
    saveCompanyFeedItemRoutine,
    createCompanyFeedItemRoutine,
    setCompanyFeedPaginationRoutine, applyReactionRoutine, setExpandedImageRoutine
} from "../../sagas/companyFeed/routines";
import {IPaginationInfo} from "../../models/IPaginationInfo";
import {deleteCommentRoutine, saveCommentRoutine, updateCommentRoutine} from "../../sagas/comments/routines";

export interface ICompanyFeedState {
    list: IPaginationInfo<ICompanyFeedItem>;
    current: ICompanyFeedItem;
    expandedImageUrl: string;
    isLoading: boolean;
    error?: string;
}

const initialState: ICompanyFeedState = {
    list: null,
    current: null,
    isLoading: false,
    expandedImageUrl: null,
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
        case saveCommentRoutine.TRIGGER:
        case updateCommentRoutine.TRIGGER:
        case deleteCommentRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case loadCompanyFeedRoutine.FAILURE:
        case loadCompanyFeedItemRoutine.FAILURE:
        case createCompanyFeedItemRoutine.FAILURE:
        case saveCompanyFeedItemRoutine.FAILURE:
        case saveCommentRoutine.FAILURE:
        case updateCommentRoutine.FAILURE:
        case deleteCommentRoutine.FAILURE:
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
        case saveCommentRoutine.SUCCESS:
            return {
                ...state,
                current: {
                    ...state.current,
                    comments: [...state.current.comments, payload],
                    commentsCount: state.current.commentsCount + 1
                },
                isLoading: false
            };
        case updateCommentRoutine.SUCCESS:
            return {
                ...state,
                current: {
                    ...state.current,
                    comments: state.current.comments.map(comment => comment.id === payload.id ? payload : comment)
                },
                isLoading: false
            };
        case deleteCommentRoutine.SUCCESS:
            return {
                ...state,
                current: {
                    ...state.current,
                    comments: state.current.comments.filter(comment => comment.id !== payload),
                    commentsCount: state.current.commentsCount - 1
                }
            };
        case setExpandedImageRoutine.TRIGGER:
            return {
                ...state,
                expandedImageUrl: payload
            };
        case applyReactionRoutine.TRIGGER:
            const list = {...state.list};
            if (payload.toAdd) {
                const newsReactions = list.items.filter(r => r.id === payload.newsId)[0].reactions
                    .filter(r => r.emoji === payload.reaction)[0];
                if (newsReactions !== undefined) {
                    if (!newsReactions.reactedUsers.filter(u => u.id === payload.user.id)) {
                        newsReactions.reactedUsers.push(payload.user);
                        newsReactions.reactedByCurrentUser = true;
                    }
                } else {
                    list.items.filter(r => r.id === payload.newsId)[0]
                        .reactions.push({
                        emoji: payload.reaction,
                        reactedByCurrentUser: true,
                        reactedUsers: [payload.user]
                    });
                }
            } else {
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
