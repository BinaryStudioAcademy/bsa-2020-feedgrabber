import React, {FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as yup from 'yup';
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
import LoaderWrapper from "../../components/LoaderWrapper";
import {IUserShort} from "../../models/user/types";
import {ITeam, ITeamCreate, ITeamUpdate, ITeamUserToggle} from "../../models/teams/ITeam";
import UIButton from "../../components/UI/UIButton";
import styles from './styles.module.sass';
import {Formik} from "formik";
import {Image} from "semantic-ui-react";

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

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
});

const defaultAvatar =
  "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

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
  }) => {
  const [isNew, setIsNew] = useState<boolean>(match.params.id === "new");

  useEffect(() => {
    if (!companyUsers && !isLoadingUsers && !failedUsers) {
      loadUsers();
    }
  }, [failedUsers, companyUsers, isLoadingUsers, loadUsers]);

  useEffect(() => {
    if (!isNew && !currentTeam && !isLoadingTeam && !failedTeam && companyUsers) {
      loadCurrentTeam(match.params.id);
    }
  }, [isNew, failedTeam, match, currentTeam, isLoadingTeam, companyUsers, loadCurrentTeam]);

  useEffect(() => {
    if (isNew && match.params.id !== "new") {
      setIsNew(false);
    }
  }, [match, isNew]);

  const onSubmit = values => {
    if (isNew) {
      createTeam({name: values.name});
    } else {
      updateTeam({id: currentTeam?.id, name: values.name});
    }
  };

  return (
    <>
      <UIPageTitle title={isNew ? "Add Team" : "Edit Team"}/>
      <UIContent>
        <UIColumn wide>
          <LoaderWrapper loading={!isNew && (!currentTeam || isLoadingTeam)}>
            <UICard>
              <UICardBlock>
                <h3>Metadata</h3>
              </UICardBlock>
              <UICardBlock>
                <Formik
                  initialValues={{name: (currentTeam?.name || "")}}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({
                      values,
                      errors,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      touched
                    }) => {
                    const error = errors.name || currentTeamError;
                    return (
                      <form onSubmit={handleSubmit}>
                        <label>Team name</label>
                        <input
                          id="name"
                          name="name"
                          placeholder="Team name"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        {error && <div>{error}<br/><br/></div>}
                        <UIButton
                          title={isNew ? "Add" : "Update"}
                          onClick={handleSubmit}
                          submit
                          loading={isLoadingRequest}
                          disabled={isLoadingRequest}
                        />
                      </form>
                    );
                  }}
                </Formik>
              </UICardBlock>
            </UICard>
          </LoaderWrapper>
        </UIColumn>
        {!isNew && (
          <>
            <UIColumn>
              <LoaderWrapper loading={isLoadingUsers}>
                <UICard>
                  <UICardBlock>
                    <h3>Users</h3>
                  </UICardBlock>
                  {(companyUsers || []).map(user => (
                    <UICardBlock key={user.id} className={styles.toggleCardBlock}>
                      <div className={styles.cardUserBlock}>
                        <Image src={user.avatar ?? defaultAvatar} size="mini" avatar/>
                        <h4>{user.username}</h4>
                      </div>
                      {currentTeam && (
                        <UIButton
                          title={user.selected ? "Remove" : "Add"}
                          secondary={user.selected}
                          loading={user.loading}
                          disabled={user.loading}
                          onClick={() => toggleUser({teamId: currentTeam.id, userId: user.id, username: user.username})}
                        />
                      )}
                    </UICardBlock>
                  ))}
                </UICard>
              </LoaderWrapper>
            </UIColumn>
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
