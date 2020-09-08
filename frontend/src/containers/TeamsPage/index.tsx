import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {IAppState} from "../../models/IAppState";
import {
  clearCurrentTeamRoutine,
  deleteTeamRoutine,
  loadCompanyUsersRoutine,
  loadTeamsRoutine
} from "../../sagas/teams/routines";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UIButton from "../../components/UI/UIButton";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {Icon} from "semantic-ui-react";
import LoaderWrapper from "../../components/helpers/LoaderWrapper";
import {history} from "../../helpers/history.helper";
import {Permissions} from "../../components/helpers/AccessManager/rbac-rules";
import AccessManager from "../../components/helpers/AccessManager";
import { useTranslation } from 'react-i18next';
import styles from './styles.module.sass';

const TeamsPage: FC<ITeamsPageProps> = (
  {
    teams,
    loadTeams,
    loadUsers,
    deleteTeam,
    clearCurrentTeam,
    isLoading,
    result
  }
) => {
  useEffect(() => {
    if (!teams && !isLoading) {
      loadTeams();
    }
  }, [teams, isLoading, loadTeams, loadUsers]);

  const handleRedirect = (id: string): void => {
    clearCurrentTeam();
    history.push(`/people/teams/${id}`);
  };

  const [t] = useTranslation();

    return (
        <>
            <UIContent>
                <LoaderWrapper loading={isLoading}>
                    <UIColumn wide>
                        <AccessManager staticPermission={Permissions.createTeams}>
                            <UIButton
                                title={t("Add Team")}
                                onClick={() => handleRedirect("new")}
                                center
                                submit
                            />
                        </AccessManager>
                    </UIColumn>

                  {teams &&
                  (teams.length > 0
                    ? teams.map(team => {
                        const match = result
                            .teams
                            .map(t => t.id)
                            .includes(team.id);
                        return <UIColumn key={team.id}>
                            <UICard searched={match}>
                                <UICardBlock>
                                    <h3 className={styles.teamHeader}>{team.name}</h3>
                                    <span style={
                                        {
                                            fontSize: '0.8rem',
                                            display: 'inline-flex',
                                            alignItems: 'center'
                                        }
                                    }>{match && t('Matches searched query')}</span>
                                </UICardBlock>
                                <UICardBlock>
                                    <Icon color={"grey"} name="users"/>{team.membersAmount} {t("Member(s)")}
                                </UICardBlock>
                                <AccessManager staticPermission={Permissions.manageTeams}>
                                    <UICardBlock>
                                        <UIButton title={t("Manage")} onClick={() => handleRedirect(team.id)}/>
                                        <UIButton title={t("Delete")} secondary loading={team.deleteLoading}
                                                  disabled={team.deleteLoading} onClick={() => deleteTeam(team.id)}/>
                                    </UICardBlock>
                                </AccessManager>
                            </UICard>
                        </UIColumn>;})
                      : <div className={styles.noItemsLabel}>{t("No items")}</div>
                  )}
                </LoaderWrapper>
            </UIContent>
        </>
    );
};

const mapState = (state: IAppState) => ({
  teams: state.teams.teams,
  companyUsers: state.teams.companyUsers,
  isLoading: state.teams.isLoading,
  result: state.search.result
});

const mapDispatch = {
  loadTeams: loadTeamsRoutine,
  loadUsers: loadCompanyUsersRoutine,
  deleteTeam: deleteTeamRoutine,
  clearCurrentTeam: clearCurrentTeamRoutine
};

const connector = connect(mapState, mapDispatch);

type ITeamsPageProps = ConnectedProps<typeof connector>;

export default connector(TeamsPage);
