import {
    clearCurrentTeamRoutine,
    createTeamRoutine,
    deleteTeamRoutine,
    loadCompanyUsersRoutine,
    loadCurrentTeamRoutine,
    loadTeamsRoutine, setTeamPaginationRoutine, toggleLeadCurrentTeamRoutine,
    toggleUserCurrentTeamRoutine,
    updateTeamRoutine
} from '../../sagas/teams/routines';
import {Routine} from 'redux-saga-routines';
import {ITeam, ITeamShort} from 'models/teams/ITeam';
import {IUserShort} from "../../models/user/types";
import {IPaginationInfo} from "../../models/IPaginationInfo";

export interface ITeamCurrent {
    failed?: boolean;
    isLoadingTeam?: boolean;
    isLoadingRequest?: boolean;
    isLoadingToggleLead?: boolean;
    currentTeam?: ITeam;
    error?: string;
}

export interface ITeamsState {
    pagination?: IPaginationInfo<ITeamShort>;
    isLoading: boolean;
    modalShown: boolean;
    isModalLoading: boolean;
    companyUsers?: IUserShort[];
    failedUsers?: boolean;
    isLoadingUsers?: boolean;
    current: ITeamCurrent;
    error?: string;
}

const initState: ITeamsState = {
    isLoading: false,
    modalShown: false,
    isModalLoading: false,
    current: {},
    pagination: {
        items: [],
        size: 10,
        total: 0,
        page: 0
    }
};

const teamsReducer = (state = initState, action: Routine<any>): ITeamsState => {
    switch (action.type) {
        case loadTeamsRoutine.TRIGGER:
            return {
                ...state,
                isLoading: true
            };
        case setTeamPaginationRoutine.TRIGGER:
            return {
                ...state,
                pagination: action.payload
            };
        case loadTeamsRoutine.SUCCESS:
            return {
                ...state,
                pagination: action.payload,
                isLoading: false
            };
        case loadTeamsRoutine.FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };

        case clearCurrentTeamRoutine.TRIGGER:
            return {
                ...state,
                companyUsers: state.companyUsers ? state.companyUsers.map(u => ({
                    ...u,
                    selected: undefined
                })) : undefined,
                current: {}
            };

        case loadCurrentTeamRoutine.TRIGGER:
            return {
                ...state,
                current: {
                    ...state.current,
                    isLoadingTeam: true
                }
            };
        case loadCurrentTeamRoutine.SUCCESS:
            const team: ITeam = action.payload;
            return {
                ...state,
                companyUsers:
                    state.companyUsers
                        .map(u => (team.membersId.includes(u.id) ? {...u, selected: true} : u))
                        .sort((a, b) => Number(a.username < b.username))
                        .sort((a, b) => Number(a.selected && !b.selected))
                        .sort(a => Number(a.id !== team.teamLeadId)),
                current: {
                    ...state.current,
                    isLoadingTeam: false,
                    currentTeam: team
                }
            };
        case loadCurrentTeamRoutine.FAILURE:
            return {
                ...state,
                current: {
                    ...state.current,
                    isLoadingTeam: false,
                    failed: true
                }
            };

        case loadCompanyUsersRoutine.TRIGGER:
            return {
                ...state,
                isLoadingUsers: true
            };
        case loadCompanyUsersRoutine.SUCCESS:
            return {
                ...state,
                companyUsers: action.payload,
                isLoadingUsers: false
            };
        case loadCompanyUsersRoutine.FAILURE:
            return {
                ...state,
                isLoadingUsers: false,
                failedUsers: true
            };

        case toggleUserCurrentTeamRoutine.TRIGGER:
            return {
                ...state,
                companyUsers: state.companyUsers.map(u => (
                    u.id === action.payload.userId
                        ? {...u, loading: true}
                        : u
                ))
            };
        case toggleUserCurrentTeamRoutine.SUCCESS:
            const difference = action.payload.added ? 1 : -1;
            return {
                ...state,
                companyUsers: state.companyUsers.map(u => (
                    u.id === action.payload.userId
                        ? {...u, loading: false, selected: action.payload.added}
                        : u
                )),
                pagination: {
                    ...state.pagination,
                    items: state.pagination.items ?
                        state.pagination.items.map(t => (
                            t.id === action.payload.teamId
                                ? {...t, membersAmount: t.membersAmount + difference}
                                : t
                        ))
                        : undefined
                }
            };
        case toggleUserCurrentTeamRoutine.FAILURE:
            return {
                ...state,
                companyUsers: state.companyUsers.map(u => (
                    u.id === action.payload
                        ? {...u, loading: false}
                        : u
                ))
            };

        case toggleLeadCurrentTeamRoutine.TRIGGER:
            return {
                ...state,
                current: {
                    ...state.current,
                    isLoadingToggleLead: true
                }
            };
        case toggleLeadCurrentTeamRoutine.SUCCESS:
            return {
                ...state,
                current: {
                    ...state.current,
                    isLoadingToggleLead: false,
                    currentTeam: {
                        ...state.current.currentTeam,
                        teamLeadId: action.payload.leadId
                    }
                }
            };
        case toggleLeadCurrentTeamRoutine.FAILURE:
            return {
                ...state,
                current: {
                    ...state.current,
                    isLoadingToggleLead: false
                }
            };

        case updateTeamRoutine.TRIGGER:
            return {
                ...state,
                current: {
                    ...state.current,
                    isLoadingRequest: true
                }
            };
        case updateTeamRoutine.SUCCESS:
            return {
                ...state,
                current: {
                    ...state.current,
                    isLoadingRequest: false
                }
            };
        case updateTeamRoutine.FAILURE:
            return {
                ...state,
                current: {
                    ...state.current,
                    error: action.payload,
                    isLoadingRequest: false
                }
            };

        case createTeamRoutine.TRIGGER:
            return {
                ...state,
                current: {
                    ...state.current,
                    isLoadingRequest: true
                }
            };
        case createTeamRoutine.SUCCESS:
            return {
                ...state,
                current: {
                    currentTeam: action.payload
                }
            };
        case createTeamRoutine.FAILURE:
            return {
                ...state,
                current: {
                    ...state.current,
                    error: action.payload,
                    isLoadingRequest: false
                }
            };

        case deleteTeamRoutine.TRIGGER:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    items: (state.pagination.items || [])
                        .map(t => t.id === action.payload ? {...t, deleteLoading: true} : t)
                }
            };
        case deleteTeamRoutine.SUCCESS:
        case deleteTeamRoutine.FAILURE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    items: (state.pagination.items || [])
                        .map(t => t.id === action.payload ? {...t, deleteLoading: false} : t)
                }
            };

        default:
            return state;
    }
};

export default teamsReducer;

