import React, {FunctionComponent} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import InvitationCreationBlock from "./linkCreation";
import {sendInvitationRoutine} from "../../sagas/invitation/routines";

const InvitationLinkPage: FunctionComponent<IInvitationLinkProps> = (
  {
    sendInvitation,
    errorGeneration,
    isLoadingGeneration
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
      </UIContent>
    </>
  );
};

const mapState = (state: IAppState) => ({
  isLoadingGeneration: state.invitation.isLoadingGeneration,
  errorGeneration: state.invitation.errorGeneration
});

const mapDispatch = {
  sendInvitation: sendInvitationRoutine
};

const connector = connect(mapState, mapDispatch);

type IInvitationLinkProps = ConnectedProps<typeof connector>;

export default connector(InvitationLinkPage);
