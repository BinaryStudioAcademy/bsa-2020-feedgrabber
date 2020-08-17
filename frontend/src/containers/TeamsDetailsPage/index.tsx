import React, {FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {IAppState} from "../../models/IAppState";
import {
  createTeamRoutine,
  loadCompanyUsersRoutine,
  loadCurrentTeamRoutine,
  toggleUserCurrentTeamRoutine, updateTeamRoutine
} from "../../sagas/teams/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {IUserShort} from "../../models/user/types";
import {ITeam, ITeamCreate, ITeamUpdate, ITeamUserToggle} from "../../models/teams/ITeam";
import TeamMetadataBlock from "./metadataBlock";
import TeamUsersBlock from "./usersBlock";

export interface ITeamDetailsPageProps {
  match: any;
  failedTeam?: boolean;
  failedUsers?: boolean;
  currentTeamError?: string;
  currentTeam?: ITeam;
  companyUsers?: IUserShort[];
  isLoadingUsers?: boolean;
  isLoadingTeam?: boolean;
  isLoadingRequest?: boolean;

  loadUsers(): void;
  updateTeam(team: ITeamUpdate): void;
  toggleUser(request: ITeamUserToggle): void;
  loadCurrentTeam(id: string): void;
  createTeam(team: ITeamCreate): void;
}

const TeamDetailsPage: FC<ITeamDetailsPageProps> = (
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
      <UIPageTitle title={isNew ? "Add Team" : "Edit Team"}/>
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
                  <h3>Requests</h3>
                </UICardBlock>
                <UICardBlock>
                  <p>Here could be requests or something else</p>
                </UICardBlock>
              </UICard>
            </UIColumn>
          </>
        )}
      </UIContent>
    </>
  );
};

const mapState = (state: IAppState) => {
  return {
    companyUsers: state.teams.companyUsers,
    isLoadingUsers: state.teams.isLoadingUsers,
    isLoadingTeam: state.teams.current.isLoadingTeam,
    currentTeam: state.teams.current.currentTeam,
    currentTeamError: state.teams.current.error,
    isLoadingRequest: state.teams.current.isLoadingRequest,
    failedTeam: state.teams.current.failed,
    failedUsers: state.teams.failedUsers
  };
};

const mapDispatch = {
  loadUsers: loadCompanyUsersRoutine,
  loadCurrentTeam: loadCurrentTeamRoutine,
  createTeam: createTeamRoutine,
  updateTeam: updateTeamRoutine,
  toggleUser: toggleUserCurrentTeamRoutine
};

const connector = connect(mapState, mapDispatch);

export default connector(TeamDetailsPage);
