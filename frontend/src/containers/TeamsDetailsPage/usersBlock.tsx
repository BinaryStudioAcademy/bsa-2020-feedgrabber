import React from "react";
import UIColumn from "../../components/UI/UIColumn";
import LoaderWrapper from "../../components/helpers/LoaderWrapper";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import UIButton from "../../components/UI/UIButton";
import {ITeam, ITeamLeadToggle, ITeamUserToggle} from "../../models/teams/ITeam";
import styles from "./styles.module.sass";
import {Icon, Image} from "semantic-ui-react";
import {IUserShort} from "../../models/user/types";
import { useTranslation } from "react-i18next";

interface ITeamUsersBlockProps {
  isHrOrCo: boolean;
  currentTeam?: ITeam;
  companyUsers?: IUserShort[];
  isLoadingUsers?: boolean;
  isLoadingLeadToggle?: boolean;

  toggleUser(request: ITeamUserToggle): void;
  toggleLead(request: ITeamLeadToggle): void;
}

const defaultAvatar =
  "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const TeamUsersBlock: React.FunctionComponent<ITeamUsersBlockProps> = (
  {
    isHrOrCo,
    currentTeam,
    companyUsers,
    toggleUser,
    toggleLead,
    isLoadingUsers,
    isLoadingLeadToggle
  }
) => {
  const [t] = useTranslation();
  const isUserTeamLead = (user: IUserShort) => {
    return user.id === currentTeam?.teamLeadId;
  };

  return (
    <UIColumn>
      <LoaderWrapper loading={isLoadingUsers}>
        <UICard>
          <UICardBlock>
            <h3>{t("Users")}</h3>
          </UICardBlock>
          {(companyUsers || []).filter(u => isHrOrCo ? true : u.selected).map(user => (
            <UICardBlock key={user.id} className={styles.toggleCardBlock}>
              <div className={styles.cardUserBlock}>
                <Image src={user.avatar ?? defaultAvatar} size="mini" avatar/>
                <h4>{user.username}</h4>
                {isHrOrCo && user.selected && (
                  <Icon
                    name={isUserTeamLead(user) ? "star" : "star outline"}
                    className={`${styles.cardUserStar} ${isUserTeamLead(user) ? styles.cardUserStarActive : ""}`}
                    onClick={() => {
                      if (!isLoadingLeadToggle) {
                        toggleLead({teamId: currentTeam.id, userId: user.id, username: user.username});
                      }
                    }}
                  />
                )}
              </div>
              {isHrOrCo && currentTeam && (
                <UIButton
                  title={user.selected ? t("Remove") : t("Add")}
                  secondary={user.selected}
                  loading={user.loading}
                  disabled={user.loading}
                  onClick={() => toggleUser({teamId: currentTeam.id, userId: user.id, username: user.username})}
                />
              )}
            </UICardBlock>
          ))}
        </UICard>
      </LoaderWrapper>
    </UIColumn>
  );
};

export default TeamUsersBlock;
