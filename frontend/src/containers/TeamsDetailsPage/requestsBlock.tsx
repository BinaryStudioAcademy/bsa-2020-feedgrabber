import React, {useEffect} from "react";
import UIColumn from "../../components/UI/UIColumn";
import LoaderWrapper from "../../components/LoaderWrapper";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import {ITeam} from "../../models/teams/ITeam";
import { useTranslation } from "react-i18next";
import {IRequestShort} from "../../models/report/IReport";

interface ITeamRequestsBlockProps {
  currentTeam?: ITeam;
  isLoadingRequests?: boolean;
  requestsList?: IRequestShort[];
  loadingFailed?: boolean;

  loadRequests(teamId: string): void;
}

const TeamRequestsBlock: React.FunctionComponent<ITeamRequestsBlockProps> = (
  {
    currentTeam,
    isLoadingRequests,
    requestsList,
    loadRequests,
    loadingFailed
  }
) => {
  const [t] = useTranslation();
  useEffect(() => {
    if (currentTeam && !requestsList && !isLoadingRequests && !loadingFailed) {
      loadRequests(currentTeam.id);
    }
  }, [loadRequests, currentTeam, requestsList, isLoadingRequests, loadingFailed]);

  return (
    <UIColumn>
      <LoaderWrapper loading={isLoadingRequests}>
        <UICard>
          <UICardBlock>
            <h3>{t("Requests")}</h3>
          </UICardBlock>
        </UICard>
      </LoaderWrapper>
    </UIColumn>
  );
};

export default TeamRequestsBlock;
