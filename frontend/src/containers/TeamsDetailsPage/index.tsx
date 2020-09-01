import React, {FC, useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {IAppState} from "../../models/IAppState";
import {
    createTeamRoutine,
    loadCompanyUsersRoutine,
    loadCurrentTeamRoutine,
    toggleUserCurrentTeamRoutine,
    updateTeamRoutine
} from "../../sagas/teams/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import TeamMetadataBlock from "./metadataBlock";
import TeamUsersBlock from "./usersBlock";
import { useTranslation } from 'react-i18next';

const TeamDetailsPage: FC<Props & { match }> = (
    {
        match,
        currentTeamError,
        currentTeam,
        companyUsers,
        loadUsers,
        updateTeam,
        toggleUser,
        loadCurrentTeam,
        createTeam,
        failedTeam,
        failedUsers,
        isLoadingUsers,
        isLoadingTeam,
        isLoadingRequest
    }
) => {
    const [t] = useTranslation();
    const [isNew, setIsNew] = useState<boolean>(match.params.id === "new");

    // load users
    useEffect(() => {
        if (!companyUsers && !isLoadingUsers && !failedUsers) {
            loadUsers();
        }
    }, [failedUsers, companyUsers, isLoadingUsers, loadUsers]);

    // then load teams
    useEffect(() => {
        if (!isNew && !currentTeam && !isLoadingTeam && !failedTeam && companyUsers) {
            loadCurrentTeam(match.params.id);
        }
    }, [isNew, failedTeam, match, currentTeam, isLoadingTeam, companyUsers, loadCurrentTeam]);

    // handle change from adding to editing
    useEffect(() => {
        if (isNew && match.params.id !== "new") {
            setIsNew(false);
        }
    }, [match, isNew]);

    return (
        <>
            <UIPageTitle title={isNew ? t("Add Team") : t("Edit Team")}/>
            <UIContent>
                <TeamMetadataBlock
                    isNew={isNew}
                    currentTeamError={currentTeamError}
                    currentTeam={currentTeam}
                    isLoadingTeam={isLoadingTeam}
                    isLoadingRequest={isLoadingRequest}
                    updateTeam={updateTeam}
                    createTeam={createTeam}
                />
                {!isNew && (
                    <>
                        <TeamUsersBlock
                            currentTeam={currentTeam}
                            companyUsers={companyUsers}
                            isLoadingUsers={isLoadingUsers}
                            toggleUser={toggleUser}
                        />
                        <UIColumn>
                            <UICard>
                                <UICardBlock>
                                    <h3>{t("Requests")}</h3>
                                </UICardBlock>
                                <UICardBlock>
                                    <p>{t("Here could be requests or something else")}</p>
                                </UICardBlock>
                            </UICard>
                        </UIColumn>
                    </>
                )}
            </UIContent>
        </>
    );
};

const mapState = (state: IAppState) => ({
    companyUsers: state.teams.companyUsers,
    isLoadingUsers: state.teams.isLoadingUsers,
    isLoadingTeam: state.teams.current.isLoadingTeam,
    currentTeam: state.teams.current.currentTeam,
    currentTeamError: state.teams.current.error,
    isLoadingRequest: state.teams.current.isLoadingRequest,
    failedTeam: state.teams.current.failed,
    failedUsers: state.teams.failedUsers
});

const mapDispatch = {
    loadUsers: loadCompanyUsersRoutine,
    loadCurrentTeam: loadCurrentTeamRoutine,
    createTeam: createTeamRoutine,
    updateTeam: updateTeamRoutine,
    toggleUser: toggleUserCurrentTeamRoutine
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

export default connector(TeamDetailsPage);
