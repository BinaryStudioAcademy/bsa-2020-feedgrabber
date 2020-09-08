import React, {FunctionComponent} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import UIPageTitle from "../../components/UI/UIPageTitle";
import UIContent from "../../components/UI/UIContent";
import InvitationCreationBlock from "./linkCreation";
import {
  deleteInvitationRoutine,
  loadInvitationsListRoutine, resendInvitationRoutine,
  sendInvitationRoutine
} from "../../sagas/invitation/routines";
import InvitationsListBlock from "./linksList";
import DomainCreationBlock from "./emailDomainCreation";
import UIColumn from "components/UI/UIColumn";
import {useTranslation} from "react-i18next";

const InvitationLinkPage: FunctionComponent<IInvitationLinkProps> = (
  {
    invitationsList,
    errorGeneration,
    isLoadingGeneration,
    isLoadingList,
    errorLoadingList,

    loadInvitations,
    sendInvitation,
    resendInvitation,
    deleteInvitation,

    company
  }
) => {
  const [t] = useTranslation();
  return (
    <>
      <UIPageTitle title={t("Invitations")} />
      <UIContent>
        <UIColumn>
          <InvitationCreationBlock
          responseError={errorGeneration}
          sendInvitation={sendInvitation}
          isLoading={isLoadingGeneration}
        />
        </UIColumn>
        <UIColumn>
          <DomainCreationBlock/>
        </UIColumn>
        <InvitationsListBlock
          loadInvitations={loadInvitations}
          invitationsList={invitationsList}
          loadingList={isLoadingList}
          errorLoading={errorLoadingList}
          deleteInvitation={deleteInvitation}
          resendInvitation={resendInvitation}
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
  errorLoadingList: state.invitation.errorLoadingList,
  company: state.company.currentCompany
});

const mapDispatch = {
  loadInvitations: loadInvitationsListRoutine,
  sendInvitation: sendInvitationRoutine,
  resendInvitation: resendInvitationRoutine,
  deleteInvitation: deleteInvitationRoutine
};

const connector = connect(mapState, mapDispatch);

type IInvitationLinkProps = ConnectedProps<typeof connector>;

export default connector(InvitationLinkPage);
