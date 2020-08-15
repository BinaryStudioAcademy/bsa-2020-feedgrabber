import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import TeamsList from '../../components/TeamsList';
import {IAppState} from "../../models/IAppState";
import {
    createTeamRoutine,
    hideModalTeamsRoutine, loadCompanyUsersRoutine,
    loadTeamsRoutine,
    showModalTeamsRoutine
} from "../../sagas/teams/routines";

const TeamList: FC<ITeamListProps> = (
    {
        teams,
        loadTeams,
        companyUsers,
        loadUsers,
        modalShown,
        showModal,
        hideModal,
        createTeam,
        isModalLoading
    }) => {
    useEffect(() => {
        loadTeams();
        loadUsers();
    }, [loadTeams, loadUsers]);

    return <TeamsList
        teams={teams}
        modalShown={modalShown}
        showModal={showModal}
        hideModal={hideModal}
        createTeam={createTeam}
        isModalLoading={isModalLoading}
        companyUsers={companyUsers}
    />;
};

const mapState = (state: IAppState) => {
    return {
        teams: state.teams.teams,
        companyUsers: state.teams.companyUsers,
        isLoading: state.teams.isLoading,
        modalShown: state.teams.modalShown,
        isModalLoading: state.teams.isModalLoading
    };
};

const mapDispatch = {
    loadTeams: loadTeamsRoutine,
    loadUsers: loadCompanyUsersRoutine,
    createTeam: createTeamRoutine,
    showModal: showModalTeamsRoutine,
    hideModal: hideModalTeamsRoutine
};

const connector = connect(mapState, mapDispatch);

type ITeamListProps = ConnectedProps<typeof connector>;

export default connector(TeamList);
