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
import {Permissions} from "../../components/AccessManager/rbac-rules";
import AccessManager from "../../components/AccessManager";
import { useTranslation } from 'react-i18next';

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

  const [t] = useTranslation();

  return (
    <>
      <UIPageTitle title={t("Teams List")}/>
      <UIContent>
        <LoaderWrapper loading={isLoading}>
          <UIColumn wide>
            <AccessManager staticPermission={Permissions.createTeams}>
                <UIButton
                  title={t("Add Team")}
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
                <AccessManager staticPermission={Permissions.manageTeams}>
                    <UICardBlock>
                      <UIButton title={t("Manage")} onClick={() => handleRedirect(team.id)}/>
                      <UIButton title={t("Delete")} secondary loading={team.deleteLoading}
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
