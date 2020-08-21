import React, {FunctionComponent} from 'react';
import {Grid} from "semantic-ui-react";
import './styles.sass';
import {IAppState} from "../../../models/IAppState";
import {connect} from "react-redux";
import {IUserInfo} from "../../../models/user/types";
import {
  deleteInvitationRoutine,
  generateInvitationRoutine,
  loadInvitationRoutine
} from "../../../sagas/invitation/routines";
import InvitationLink from "../../InvitationLink";

interface IProfileInvitationProps {
  user: IUserInfo;
  invitationLoading?: boolean;
  invitationLink?: string | null;

  loadInvitation(): void;
  generateInvitation(): void;
  deleteInvitation(): void;
}

const ProfileInvitation: FunctionComponent<IProfileInvitationProps> = (
  {
    user,
    invitationLoading,
    invitationLink,
    loadInvitation,
    generateInvitation,
    deleteInvitation
  }
) => {
  return (
    <Grid container textAlign="left" className={"settings-card"}>
      <Grid.Column>
        {user?.role === "company_owner" && (
          <InvitationLink
            invitationLink={invitationLink}
            invitationLoading={invitationLoading}
            loadInvitation={loadInvitation}
            generateInvitation={generateInvitation}
            deleteInvitation={deleteInvitation}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

const mapState = (state: IAppState) => ({
  user: state.user.info,
  invitationLoading: state.invitation.isLoading,
  invitationLink: state.invitation.link
});

const mapDispatchToProps = {
  loadInvitation: loadInvitationRoutine,
  generateInvitation: generateInvitationRoutine,
  deleteInvitation: deleteInvitationRoutine
};

export default connect(mapState, mapDispatchToProps)(ProfileInvitation);
