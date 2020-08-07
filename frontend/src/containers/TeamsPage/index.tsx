import React from 'react';
import { connect } from 'react-redux';
import TeamsList from '../../components/TeamsList';
import { loadTeamsRoutine } from './routines';
import { ITeam } from 'models/ITeam';

interface ITeamListProps {
  teams: ITeam[];
  loadTeams(): void;
}

interface ILocalState {
  teams: ITeam[];
}

class TeamList extends React.Component<ITeamListProps, ILocalState> {
  
  constructor(props: ITeamListProps) {
    super(props);
    this.state = {
      teams: []
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.teams.length !== prevState.teams.length) {
      return {
        teams: nextProps.teams
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    const { loadTeams } = this.props;
    loadTeams();
  }

  render() {
    const { teams } = this.state;
    return (
      <TeamsList teams={teams} />
    );
  }
}

const mapStateToProps = rootState => {
  return {
    teams: rootState.teams.teams
  };
};

const mapDispatchToProps = {
  loadTeams: loadTeamsRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamList);