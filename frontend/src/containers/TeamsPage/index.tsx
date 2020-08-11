import React, {FC, useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import TeamsList from '../../components/TeamsList';
import { loadTeamsRoutine } from './routines';
import { ITeam } from 'models/teams/ITeam';
import {Dimmer, Loader} from "semantic-ui-react";
import {IAppState} from "../../models/IAppState";

const TeamList: FC<ITeamListProps> = ({ teams, loadTeams, isLoading }) => {
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
