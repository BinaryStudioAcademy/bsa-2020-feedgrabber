import React, {FC, useEffect} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {IAppState} from "../../models/IAppState";
import {
    clearCurrentTeamRoutine,
    deleteTeamRoutine,
    loadCompanyUsersRoutine,
    loadTeamsRoutine, setTeamPaginationRoutine
} from "../../sagas/teams/routines";
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
import {useTranslation} from 'react-i18next';
import styles from './styles.module.sass';
import GenericPagination from "../../components/GenericPagination";
import {ITeamShort} from "../../models/teams/ITeam";

const TeamsPage: FC<ITeamsPageProps> = (
    {
        pagination,
        setPagination,
        loadTeams,
        loadUsers,
        deleteTeam,
        clearCurrentTeam,
        isLoading,
        result
    }
) => {
    useEffect(() => {
        if (!pagination.items.length && !isLoading) {
            loadTeams();
        }
    }, [pagination.items, isLoading, loadTeams, loadUsers]);

    const handleRedirect = (id: string): void => {
        clearCurrentTeam();
        history.push(`/people/teams/${id}`);
    };

    const [t] = useTranslation();

    return (
        <>
            <UIContent className={styles.teams_page}>
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
                                loadItems={loadTeams}
                                mapItemToJSX={(team: ITeamShort) => {
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
                                                    <UIButton title={t("Manage")}
                                                              onClick={() => handleRedirect(team.id)}/>
                                                    <UIButton title={t("Delete")} secondary loading={team.deleteLoading}
                                                              disabled={team.deleteLoading}
                                                              onClick={() => deleteTeam(team.id)}/>
                                                </UICardBlock>
                                            </AccessManager>
                                        </UICard>
                                    </UIColumn>;
                                }}
                            />
                            : <div className={styles.noItemsLabel}>{t("No items")}</div>
                    )}
                </LoaderWrapper>
            </UIContent>
        </>
    );
};

const mapState = (state: IAppState) => ({
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
