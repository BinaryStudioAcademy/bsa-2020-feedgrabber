import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {IAppState} from "../../models/IAppState";
import {
    clearCurrentTeamRoutine,
    deleteTeamRoutine,
    loadCompanyUsersRoutine,
    loadTeamsRoutine, setTeamPaginationRoutine
} from "../../sagas/teams/routines";
import UIColumn from "../../components/UI/UIColumn";
import UIButton from "../../components/UI/UIButton";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {Icon} from "semantic-ui-react";
import LoaderWrapper from "../../components/helpers/LoaderWrapper";
import {history} from "../../helpers/history.helper";
import {Permissions} from "../../components/helpers/AccessManager/rbac-rules";
import AccessManager from "../../components/helpers/AccessManager";
import {useTranslation} from 'react-i18next';
import styles from './styles.module.sass';
import GenericPagination from "../../components/helpers/GenericPagination";
import {ITeamShort} from "../../models/teams/ITeam";

const TeamsPage: FC<ITeamsPageProps> = (
    {
        currentUser,
        pagination,
        setPagination,
        loadTeams,
        deleteTeam,
        clearCurrentTeam,
        isLoading,
        result
    }
) => {
    useEffect(() => {
            loadTeams();
    }, [loadTeams]);

    const handleRedirect = (id: string): void => {
        clearCurrentTeam();
        history.push(`/people/teams/${id}`);
    };

    const [t] = useTranslation();

  const isHrOrCo = currentUser.role === "company_owner" || currentUser.role === "hr";
  const isTeamLead = (team: ITeamShort) => currentUser?.id === team.leadId;

    return (
        <>
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

                    {(pagination.items.length > 0
                        ? <GenericPagination
                            isLoading={isLoading}
                            pagination={pagination}
                            setPagination={setPagination}
                            itemsStyle={styles.twoColumnList}
                            loadItems={loadTeams}
                            mapItemToJSX={(team: ITeamShort) => {
                                const match = result
                                    .teams
                                    .map(t => t.id)
                                    .includes(team.id);
                                return <UICard searched={match} customStyle={styles.customCard}>
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
                                    <UICardBlock>
                                      {(isHrOrCo || isTeamLead(team)) &&
                                          <UIButton title={t("Manage")} onClick={() => handleRedirect(team.id)}/>
                                      }
                                      <AccessManager staticPermission={Permissions.manageTeams}>
                                        <UIButton title={t("Delete")} secondary loading={team.deleteLoading}
                                                  disabled={team.deleteLoading} onClick={() => deleteTeam(team.id)}/>
                                      </AccessManager>
                                    </UICardBlock>
                                </UICard>;
                            }}
                        />
                        : <div className={styles.noItemsLabel}>{t("No items")}</div>
                        )}
                </LoaderWrapper>
        </>
    );
};

const mapState = (state: IAppState) => ({
  currentUser: state.user.info,
  pagination: state.teams.pagination,
  companyUsers: state.teams.companyUsers,
  isLoading: state.teams.isLoading,
  result: state.search.result
});

const mapDispatch = {
    loadTeams: loadTeamsRoutine,
    loadUsers: loadCompanyUsersRoutine,
    deleteTeam: deleteTeamRoutine,
    clearCurrentTeam: clearCurrentTeamRoutine,
    setPagination: setTeamPaginationRoutine
};

const connector = connect(mapState, mapDispatch);

type ITeamsPageProps = ConnectedProps<typeof connector>;

export default connector(TeamsPage);
