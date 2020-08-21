import React, {FunctionComponent} from "react";
import {Header, Icon} from "semantic-ui-react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import UIColumn from "../../components/UI/UIColumn";

const InvitationLinkPage: FunctionComponent<IInvitationLinkProps> = () => {
  return (
    <>
      <UIPageTitle title="Invitations" />
      <UIContent>
        <UIColumn wide>
        </UIColumn>
      </UIContent>
    </>
  );
};

const mapState = (state: IAppState) => ({});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type IInvitationLinkProps = ConnectedProps<typeof connector>;

export default connector(InvitationLinkPage);
