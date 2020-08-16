import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {IAppState} from "../../models/IAppState";
import {createTeamRoutine, loadCompanyUsersRoutine, loadCurrentTeamRoutine} from "../../sagas/teams/routines";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import LoaderWrapper from "../../components/LoaderWrapper";
import {IUserShort} from "../../models/user/types";
import {ITeam} from "../../models/teams/ITeam";
import UIButton from "../../components/UI/UIButton";
import styles from './styles.module.sass';

export interface ITeamDetailsPageProps {
  match: any;
  failedTeam?: boolean;
  failedUsers?: boolean;
  currentTeam?: ITeam;
  companyUsers?: IUserShort[];
  isLoadingUsers?: boolean;
  isLoadingTeam?: boolean;

  loadUsers(): void;
  loadCurrentTeam(id: string): void;
  createTeam(): void;
}

const TeamDetailsPage: FC<ITeamDetailsPageProps> = (
  {
    match,
    currentTeam,
    companyUsers,
    loadUsers,
    loadCurrentTeam,
    createTeam,
    failedTeam,
    failedUsers,
    isLoadingUsers,
    isLoadingTeam
  }) => {
  useEffect(() => {
    if (!companyUsers && !isLoadingUsers && !failedUsers) {
      loadUsers();
    }
  }, [failedUsers, companyUsers, isLoadingUsers, loadUsers]);

  useEffect(() => {
    if (!currentTeam && !isLoadingTeam && !failedTeam && companyUsers) {
      loadCurrentTeam(match.params.id);
    }
  }, [failedTeam, match, currentTeam, isLoadingTeam, loadCurrentTeam, companyUsers]);

  return (
    <>
      <UIPageTitle title="Edit Team"/>
      <UIContent>
        <UIColumn wide>
          <LoaderWrapper loading={!currentTeam || isLoadingTeam}>
            <UICard>
              <UICardBlock>
                <h3>Metadata</h3>
              </UICardBlock>
              <UICardBlock>
                <h4>Title</h4>
                <p><b>{currentTeam && currentTeam.name}</b></p>
              </UICardBlock>
            </UICard>
          </LoaderWrapper>
          <LoaderWrapper loading={isLoadingUsers}>
            <UICard>
              <UICardBlock>
                <h3>Users</h3>
              </UICardBlock>
              {(companyUsers || []).map(user => (
                <UICardBlock key={user.id} className={styles.toggleCardBlock}>
                  <h4>{user.username}</h4>
                  {currentTeam && (user.selected
                    ? <UIButton title="Remove" secondary />
                    : <UIButton title="Add" />)}
                </UICardBlock>
              ))}
            </UICard>
          </LoaderWrapper>
        </UIColumn>
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
    failedTeam: state.teams.current.failed,
    failedUsers: state.teams.failedUsers
  };
};

const mapDispatch = {
  loadUsers: loadCompanyUsersRoutine,
  loadCurrentTeam: loadCurrentTeamRoutine,
  createTeam: createTeamRoutine
};

const connector = connect(mapState, mapDispatch);

export default connector(TeamDetailsPage);
