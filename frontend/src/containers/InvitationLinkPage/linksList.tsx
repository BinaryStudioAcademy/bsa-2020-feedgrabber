import React, {useEffect} from "react";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {IInvitation} from "../../models/invitation/IInvitation";
import LoaderWrapper from "../../components/LoaderWrapper";
import styles from './styles.module.sass';
import UIButton from "../../components/UI/UIButton";
import {Icon} from "semantic-ui-react";

interface IInvitationsListBlockProps {
  invitationsList?: IInvitation[];
  loadingList?: boolean;
  errorLoading?: boolean;

  loadInvitations(): void;
  deleteInvitation(email: string): void;
  resendInvitation(email: string): void;
}

const InvitationsListBlock: React.FunctionComponent<IInvitationsListBlockProps> = (
  {
    invitationsList,
    loadingList,
    errorLoading,
    loadInvitations,
    resendInvitation,
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
            <UICardBlock className={styles.sentInvitationWrapper} key={i.email}>
              <div>
                <h4>
                  {i.expired
                    ? <Icon name="exclamation circle" className={styles.exclamation}/>
                    : <Icon name="check" className={i.accepted ? styles.activeCheck : styles.check}/>
                  }
                  {i.email}
                </h4>
              </div>
              <div>
                {i.expired && (
                  <UIButton
                    title="Resend"
                    onClick={() => resendInvitation(i.email)}
                    loading={i.isResending}
                    disabled={i.isResending}
                  />)}
                {!i.accepted && (
                  <UIButton
                    title="Delete"
                    secondary
                    onClick={() => deleteInvitation(i.email)}
                    loading={i.isDeleting}
                    disabled={i.isDeleting}
                  />)}
              </div>
            </UICardBlock>
          ))}
        </LoaderWrapper>
      </UICard>
    </UIColumn>
  );
};

export default InvitationsListBlock;
