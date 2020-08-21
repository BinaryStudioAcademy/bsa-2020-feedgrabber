import React, {useEffect} from "react";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {IInvitation} from "../../models/invitation/IInvitation";
import LoaderWrapper from "../../components/LoaderWrapper";
import styles from './styles.module.sass';
import UIButton from "../../components/UI/UIButton";

interface IInvitationsListBlockProps {
  invitationsList?: IInvitation[];
  loadingList?: boolean;
  errorLoading?: boolean;

  loadInvitations(): void;

  deleteInvitation(email: string): void;
}

const InvitationsListBlock: React.FunctionComponent<IInvitationsListBlockProps> = (
  {
    invitationsList,
    loadingList,
    errorLoading,
    loadInvitations,
    deleteInvitation
  }
) => {
  useEffect(() => {
    if (!invitationsList && !loadingList && !errorLoading) {
      loadInvitations();
    }
  }, [invitationsList, loadingList, errorLoading, loadInvitations]);

  return (
    <UIColumn wide>
      <UICard>
        <UICardBlock>
          <h3>Sent Invitations</h3>
        </UICardBlock>
        <LoaderWrapper loading={loadingList}>
          {invitationsList && invitationsList.map(i => (
            <UICardBlock className={styles.sentInvitationWrapper}>
              <div>
                <h4>{i.email}</h4>
              </div>
              <div>
                <UIButton title="Delete" secondary onClick={() => deleteInvitation(i.email)}/>
              </div>
            </UICardBlock>
          ))}
        </LoaderWrapper>
      </UICard>
    </UIColumn>
  );
};

export default InvitationsListBlock;
