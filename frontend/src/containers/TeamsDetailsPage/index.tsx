import React, {FC, useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {IAppState} from "../../models/IAppState";
import {
  createTeamRoutine,
  loadCompanyUsersRoutine,
  loadCurrentTeamRoutine, loadTeamRequestsRoutine, toggleLeadCurrentTeamRoutine,
  toggleUserCurrentTeamRoutine,
  updateTeamRoutine
} from "../../sagas/teams/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import TeamMetadataBlock from "./metadataBlock";
import TeamUsersBlock from "./usersBlock";
import { useTranslation } from 'react-i18next';
import TeamRequestsBlock from "./requestsBlock";
import {closeRequestRoutine} from "../../sagas/request/routines";

const TeamDetailsPage: FC<Props & { match }> = (
    {
        currentUser,
        match,
        currentTeamError,
        currentTeam,
        companyUsers,
        loadUsers,
        updateTeam,
        toggleUser,
        toggleLead,
        loadCurrentTeam,
        createTeam,
        failedTeam,
        failedUsers,
        isLoadingUsers,
        isLoadingTeam,
        isLoadingRequest,
        isLoadingToggleLead,
        isLoadingTeamRequests,
        loadTeamRequests,
        teamRequests,
        failedLoadingTeamRequests,
        closeRequest
    }
) => {
    const [t] = useTranslation();
    const [isNew, setIsNew] = useState<boolean>(match.params.id === "new");

    const isHrOrCo = currentUser.role === "company_owner" || currentUser.role === "hr";

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
                {isHrOrCo &&
                  <TeamMetadataBlock
                    isNew={isNew}
                    currentTeamError={currentTeamError}
                    currentTeam={currentTeam}
                    isLoadingTeam={isLoadingTeam}
                    isLoadingRequest={isLoadingRequest}
                    updateTeam={updateTeam}
                    createTeam={createTeam}
                  />
                }
                {!isNew && (
                    <>
                        <TeamUsersBlock
                            isHrOrCo={isHrOrCo}
                            currentTeam={currentTeam}
                            companyUsers={companyUsers}
                            isLoadingUsers={isLoadingUsers}
                            isLoadingLeadToggle={isLoadingToggleLead}
                            toggleUser={toggleUser}
                            toggleLead={toggleLead}
                        />
                        <TeamRequestsBlock
                          isHrOrCo={isHrOrCo}
                          closeRequest={closeRequest}
                          currentTeam={currentTeam}
                          loadingFailed={failedLoadingTeamRequests}
                          requestsList={teamRequests}
                          isLoadingRequests={isLoadingTeamRequests}
                          loadRequests={loadTeamRequests}
                        />
                    </>
                )}
            </UIContent>
        </>
    );
};

const mapState = (state: IAppState) => ({
    currentUser: state.user.info,
    companyUsers: state.teams.companyUsers,
    isLoadingUsers: state.teams.isLoadingUsers,
    isLoadingTeam: state.teams.current.isLoadingTeam,
    currentTeam: state.teams.current.currentTeam,
    currentTeamError: state.teams.current.error,
    isLoadingRequest: state.teams.current.isLoadingRequest,
    isLoadingToggleLead: state.teams.current.isLoadingToggleLead,
    failedTeam: state.teams.current.failed,
    failedUsers: state.teams.failedUsers,
    isLoadingTeamRequests: state.teams.current.isLoadingTeamRequests,
    teamRequests: state.teams.current.teamRequests,
    failedLoadingTeamRequests: state.teams.current.failedLoadingTeamRequests
});

const mapDispatch = {
    closeRequest: closeRequestRoutine,
    loadUsers: loadCompanyUsersRoutine,
    loadCurrentTeam: loadCurrentTeamRoutine,
    loadTeamRequests: loadTeamRequestsRoutine,
    createTeam: createTeamRoutine,
    updateTeam: updateTeamRoutine,
    toggleUser: toggleUserCurrentTeamRoutine,
    toggleLead: toggleLeadCurrentTeamRoutine
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

export default connector(TeamDetailsPage);
