import React, {FunctionComponent} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import InvitationCreationBlock from "./linkCreation";
import {
  deleteInvitationRoutine,
  loadInvitationsListRoutine,
  sendInvitationRoutine
} from "../../sagas/invitation/routines";
import InvitationsListBlock from "./linksList";

const InvitationLinkPage: FunctionComponent<IInvitationLinkProps> = (
  {
    invitationsList,
    errorGeneration,
    isLoadingGeneration,
    isLoadingList,
    errorLoadingList,

    loadInvitations,
    sendInvitation,
    deleteInvitation
  }
) => {
  return (
    <>
      <UIPageTitle title="Invitations" />
      <UIContent>
        <InvitationCreationBlock
          responseError={errorGeneration}
          sendInvitation={sendInvitation}
          isLoading={isLoadingGeneration}
        />
        <InvitationsListBlock
          loadInvitations={loadInvitations}
          invitationsList={invitationsList}
          loadingList={isLoadingList}
          errorLoading={errorLoadingList}
          deleteInvitation={deleteInvitation}
        />
      </UIContent>
    </>
  );
};

const mapState = (state: IAppState) => ({
  isLoadingGeneration: state.invitation.isLoadingGeneration,
  errorGeneration: state.invitation.errorGeneration,
  invitationsList: state.invitation.list,
  isLoadingList: state.invitation.isLoadingList,
  errorLoadingList: state.invitation.errorLoadingList
});

const mapDispatch = {
  loadInvitations: loadInvitationsListRoutine,
  sendInvitation: sendInvitationRoutine,
  deleteInvitation: deleteInvitationRoutine
};

const connector = connect(mapState, mapDispatch);

type IInvitationLinkProps = ConnectedProps<typeof connector>;

export default connector(InvitationLinkPage);
