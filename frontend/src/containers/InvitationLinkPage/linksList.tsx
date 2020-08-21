import React, {useEffect} from "react";
import * as yup from 'yup';
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {Formik} from "formik";
import UIButton from "../../components/UI/UIButton";
import {IInvitation} from "../../models/invitation/IInvitation";
import LoaderWrapper from "../../components/LoaderWrapper";

interface IInvitationsListBlockProps {
  invitationsList?: IInvitation[];
  loadingList?: boolean;
  errorLoading?: boolean;

  loadInvitations?(): void;
}

const InvitationsListBlock: React.FunctionComponent<IInvitationsListBlockProps> = (
  {
    invitationsList,
    loadingList,
    errorLoading,
    loadInvitations
  }
) => {
  useEffect(() => {
    if (!invitationsList && !loadingList && !errorLoading) {
      loadInvitations();
    }
  }, [invitationsList, loadingList, errorLoading, loadInvitations]);

  return (
    <UIColumn wide>
      <LoaderWrapper loading={loadingList}>
        <UICard>
          <UICardBlock>
            <h3>Sent Invitations</h3>
          </UICardBlock>
          {invitationsList && invitationsList.map(i => (
            <UICardBlock>
              <h4>{i.email}</h4>
            </UICardBlock>
          ))}
        </UICard>
      </LoaderWrapper>
    </UIColumn>
  );
};

export default InvitationsListBlock;
