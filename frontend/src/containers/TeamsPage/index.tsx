import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import TeamsList from '../../components/TeamsList';
import {IAppState} from "../../models/IAppState";
import {loadTeamsRoutine} from "../../sagas/teams/routines";

const TeamList: FC<ITeamListProps> = ({teams, loadTeams, isLoading}) => {
    useEffect(() => {
        loadTeams();
    }, [loadTeams]);

    return <TeamsList teams={teams}/>;
};

const mapState = (state: IAppState) => {
    return {
        teams: state.teams.teams,
        isLoading: state.teams.isLoading
    };
};

const mapDispatch = {
    loadTeams: loadTeamsRoutine
};

const connector = connect(mapState, mapDispatch);

type ITeamListProps = ConnectedProps<typeof connector>;

export default connector(TeamList);
