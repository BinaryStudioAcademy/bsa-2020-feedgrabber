import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {Button, Header, Icon, Input} from "semantic-ui-react";

interface IInvitationLinkProps {
  invitationLoading?: boolean;
  invitationLink?: string | null;

  loadInvitation(): void;
  generateInvitation(): void;
  deleteInvitation(): void;
}

const InvitationLink: FunctionComponent<IInvitationLinkProps> = (
  {
    invitationLoading,
    invitationLink,
    loadInvitation,
    generateInvitation,
    deleteInvitation
  }
) => {
  const [copied, setCopied] = useState(false);
  const input = useRef(null);

  useEffect(() => {
    setCopied(false);
  }, [invitationLink]);

  const fullInvitationLink = invitationLink ? `${window.location.host}/sign-up/${invitationLink}` : '';

  const copyToClipboard = e => {
    input.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopied(true);
  };

  return (
    <>
      <Header as='h4'>
        <Icon name='pin'/>
        <Header.Content>Invitation Link</Header.Content>
      </Header>
      {invitationLink === undefined
        ? (
          <Button loading={invitationLoading} disabled={invitationLoading} onClick={loadInvitation}>
            Show
          </Button>
        )
        : (
          <>
            <Button loading={invitationLoading} disabled={invitationLoading} onClick={loadInvitation}>
              Refresh
            </Button>
            <Button loading={invitationLoading} disabled={invitationLoading} onClick={generateInvitation}>
              Generate New
            </Button>
            <Button loading={invitationLoading} disabled={invitationLoading} onClick={deleteInvitation}>
              Delete
            </Button>
            <br/>
            <br/>
            <Input
              className="form-field"
              value={fullInvitationLink}
              placeholder="No link generated yet"
              readOnly
              action={{
                color: 'blue',
                labelPosition: 'right',
                icon: 'copy',
                content: 'Copy',
                onClick: copyToClipboard
              }}
              ref={input}
            />
            <br/>
            <br/>
            {copied && <span><Icon color="green" name="copy"/>Copied</span>}
          </>
        )}
    </>
  );
};

export default InvitationLink;
