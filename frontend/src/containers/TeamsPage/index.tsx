import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {IAppState} from "../../models/IAppState";
import {
  createTeamRoutine,
  hideModalTeamsRoutine, loadCompanyUsersRoutine,
  loadTeamsRoutine,
  showModalTeamsRoutine
} from "../../sagas/teams/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UIButton from "../../components/UI/UIButton";
import TeamsModal from "./teamsModal";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {Icon} from "semantic-ui-react";

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

  return (
    <>
      <UIPageTitle title="Teams List" />
      <UIContent>
        <UIColumn wide>
          <UIButton title="Add Team" onClick={showModal} center />

          {teams.map(team => (
            <UICard key={team.id}>
              <UICardBlock>
                <h3>{team.name}</h3>
              </UICardBlock>
              <UICardBlock>
                {/* {team.members.slice(0, 7).map(user => (*/}
                {/*  <Image avatar src={user.avatar} key={user.id}/>*/}
                {/* ))}*/}
                {/* {team.members.length > 2 &&*/}
                {/* <Icon name="angle right" size="large"/>}*/}
              </UICardBlock>
              <UICardBlock>
                <Icon name="users"/>{team.members.length} Member(s)
              </UICardBlock>
            </UICard>
          ))}
        </UIColumn>
      </UIContent>
      <TeamsModal
        modalShown={modalShown}
        hideModal={hideModal}
        createTeam={createTeam}
        isModalLoading={isModalLoading}
        companyUsers={companyUsers}
      />
    </>
  );
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
