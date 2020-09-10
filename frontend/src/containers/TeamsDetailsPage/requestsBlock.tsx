import React, {useEffect, useState} from "react";
import UIColumn from "../../components/UI/UIColumn";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {ITeam} from "../../models/teams/ITeam";
import {useTranslation} from "react-i18next";
import {IRequestShort} from "../../models/report/IReport";
import {RequestItem} from "../RequestsPage/RequestItem";
import {Tab} from "semantic-ui-react";
import {closeRequestRoutine} from "../../sagas/request/routines";
import LoaderWrapper from "../../components/helpers/LoaderWrapper";

interface ITeamRequestsBlockProps {
  currentTeam?: ITeam;
  isLoadingRequests?: boolean;
  requestsList?: IRequestShort[];
  loadingFailed?: boolean;
  isHrOrCo: boolean;

  loadRequests(teamId: string): void;
  closeRequest: typeof closeRequestRoutine;
}

const TeamRequestsBlock: React.FunctionComponent<ITeamRequestsBlockProps> = (
  {
    currentTeam,
    isLoadingRequests,
    requestsList,
    loadRequests,
    loadingFailed,
    closeRequest,
    isHrOrCo
  }
) => {
  const [t] = useTranslation();
  useEffect(() => {
    if (currentTeam && !requestsList && !isLoadingRequests && !loadingFailed) {
      loadRequests(currentTeam.id);
    }
  }, [loadRequests, currentTeam, requestsList, isLoadingRequests, loadingFailed]);

  const [open, setOpen] = useState([] as IRequestShort[]);
  const [closed, setClosed] = useState([] as IRequestShort[]);

  useEffect(() => {
    setOpen((requestsList || []).filter(r => !r.closeDate));
    setClosed((requestsList || []).filter(r => r.closeDate));
  }, [requestsList]);

  const panes = [
    {
      menuItem: {key: 'opened', icon: 'eye', content: t('Opened requests')},
      render: () => <Tab.Pane>
        {open.map(r => (
          <RequestItem isClosed={false} closeRequest={isHrOrCo ? closeRequest : undefined} showQuestionnaireTitle
                       key={r.requestId} request={r} teamId={currentTeam?.id}
          />))}
      </Tab.Pane>
    },
    {
      menuItem: {key: 'closed', icon: 'lock', content: t('Closed requests')},
      render: () => <Tab.Pane>
          {closed.map(r => (
            <RequestItem isClosed key={r.requestId} request={r} showQuestionnaireTitle/>))}
      </Tab.Pane>
    }
  ];

  return (
    <UIColumn>
      <LoaderWrapper loading={isLoadingRequests}>
        <UICard>
          <UICardBlock>
            <h3>{t("Requests")}</h3>
          </UICardBlock>
          <Tab panes={panes}/>
        </UICard>
      </LoaderWrapper>
    </UIColumn>
  );
};

export default TeamRequestsBlock;
