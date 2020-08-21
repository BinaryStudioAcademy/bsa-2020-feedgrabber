import React, {FunctionComponent} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import InvitationCreationBlock from "./linkCreation";

const InvitationLinkPage: FunctionComponent<IInvitationLinkProps> = () => {
  return (
    <>
      <UIPageTitle title="Invitations" />
      <UIContent>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <InvitationCreationBlock sendInvitation={() => {}} isLoading={false} />
      </UIContent>
    </>
  );
};

const mapState = (state: IAppState) => ({});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type IInvitationLinkProps = ConnectedProps<typeof connector>;

export default connector(InvitationLinkPage);
