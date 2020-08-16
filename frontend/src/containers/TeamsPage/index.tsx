import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {IAppState} from "../../models/IAppState";
import {
  clearCurrentTeamRoutine,
  createTeamRoutine, deleteTeamRoutine,
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
import LoaderWrapper from "../../components/LoaderWrapper";
import {history} from "../../helpers/history.helper";

const TeamList: FC<ITeamListProps> = (
  {
    teams,
    loadTeams,
    companyUsers,
    loadUsers,
    modalShown,
    showModal,
    hideModal,
    deleteTeam,
    clearCurrentTeam,
    createTeam,
    isModalLoading,
    isLoading
  }) => {
  useEffect(() => {
    if (!teams && !isLoading) {
      loadTeams();
    }
  }, [teams, isLoading, loadTeams, loadUsers]);

  return (
    <>
      <UIPageTitle title="Teams List"/>
      <UIContent>
        {/* <UIColumn wide>*/}
        <LoaderWrapper loading={isLoading}>
          <UIColumn wide>
            <UIButton title="Add Team" onClick={showModal} center/>
          </UIColumn>

          {(teams || []).map(team => (
            <UIColumn>
              <UICard key={team.id}>
                <UICardBlock>
                  <h3>{team.name}</h3>
                </UICardBlock>
                <UICardBlock>
                  <Icon name="users"/>{team.membersAmount} Member(s)
                </UICardBlock>
                <UICardBlock>
                  <UIButton title="Manage" onClick={() => {
                    clearCurrentTeam();
                    history.push(`/teams/${team.id}`);
                  }}/>
                  <UIButton title="Delete" secondary loading={team.deleteLoading}
                            onClick={() => deleteTeam(team.id)}/>
                </UICardBlock>
              </UICard>
            </UIColumn>
          ))}
        </LoaderWrapper>
        {/* </UIColumn>*/}
      </UIContent>
      <TeamsModal
        modalShown={modalShown}
        hideModal={hideModal}
        createTeam={createTeam}
        isModalLoading={isModalLoading}
        companyUsers={[]}
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
  deleteTeam: deleteTeamRoutine,
  showModal: showModalTeamsRoutine,
  hideModal: hideModalTeamsRoutine,
  clearCurrentTeam: clearCurrentTeamRoutine
};

const connector = connect(mapState, mapDispatch);

type ITeamListProps = ConnectedProps<typeof connector>;

export default connector(TeamList);
