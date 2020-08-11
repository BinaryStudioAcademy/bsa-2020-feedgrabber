import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import TeamsList from '../../components/TeamsList';
import { loadTeamsRoutine } from '../../sagas/teams/routines';
import { ITeam } from 'models/ITeam';
import {Dimmer, Loader} from "semantic-ui-react";

interface ITeamListProps {
  teams: ITeam[];
  loadTeams(): void;
  isLoading: boolean;
}

const TeamList: React.FC<ITeamListProps> = ({ teams, loadTeams, isLoading }) => {
  const [teamList, setTeamsList] = useState<ITeam[]>(teams);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  useEffect(() => {
      setTeamsList(teams);
  }, [teams]);

  return (
    isLoading
      ? <Dimmer active>
            <Loader content='Loading' />
        </Dimmer>
      : <TeamsList teams={teamList} />
  );
};

const mapStateToProps = rootState => {
  return {
    teams: rootState.teams.teams,
    isLoading: rootState.teams.isLoading
  };
};

const mapDispatchToProps = {
  loadTeams: loadTeamsRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamList);