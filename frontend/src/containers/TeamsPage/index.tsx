import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {IAppState} from "../../models/IAppState";
import {
  clearCurrentTeamRoutine,
  deleteTeamRoutine,
  loadCompanyUsersRoutine,
  loadTeamsRoutine
} from "../../sagas/teams/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UIButton from "../../components/UI/UIButton";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {Icon} from "semantic-ui-react";
import LoaderWrapper from "../../components/LoaderWrapper";
import {history} from "../../helpers/history.helper";
import AccessManager from 'components/AccessManager';
import {Credentials} from "../../components/AccessManager/rbac-rules";

const TeamsPage: FC<ITeamsPageProps> = (
  {
    teams,
    loadTeams,
    loadUsers,
    deleteTeam,
    clearCurrentTeam,
    isLoading
  }
) => {
  useEffect(() => {
    if (!teams && !isLoading) {
      loadTeams();
    }
  }, [teams, isLoading, loadTeams, loadUsers]);

  const handleRedirect = (id: string): void => {
    clearCurrentTeam();
    history.push(`/teams/${id}`);
  };

  return (
    <>
      <UIPageTitle title="Teams List"/>
      <UIContent>
        <LoaderWrapper loading={isLoading}>
          <UIColumn wide>
            <AccessManager perform={Credentials.createTeams}>
                <UIButton
                  title="Add Team"
                  onClick={() => handleRedirect("new")}
                  center
                  primary
                />
            </AccessManager>
          </UIColumn>

          {(teams || []).map(team => (
            <UIColumn key={team.id}>
              <UICard>
                <UICardBlock>
                  <h3>{team.name}</h3>
                </UICardBlock>
                <UICardBlock>
                  <Icon name="users"/>{team.membersAmount} Member(s)
                </UICardBlock>
                <AccessManager perform={Credentials.manageTeams}>
                    <UICardBlock>
                      <UIButton title="Manage" onClick={() => handleRedirect(team.id)}/>
                      <UIButton title="Delete" secondary loading={team.deleteLoading}
                                disabled={team.deleteLoading} onClick={() => deleteTeam(team.id)}/>
                    </UICardBlock>
                </AccessManager>
              </UICard>
            </UIColumn>
          ))}
        </LoaderWrapper>
      </UIContent>
    </>
  );
};

const mapState = (state: IAppState) => {
  return {
    teams: state.teams.teams,
    companyUsers: state.teams.companyUsers,
    isLoading: state.teams.isLoading
  };
};

const mapDispatch = {
  loadTeams: loadTeamsRoutine,
  loadUsers: loadCompanyUsersRoutine,
  deleteTeam: deleteTeamRoutine,
  clearCurrentTeam: clearCurrentTeamRoutine
};

const connector = connect(mapState, mapDispatch);

type ITeamsPageProps = ConnectedProps<typeof connector>;

export default connector(TeamsPage);
