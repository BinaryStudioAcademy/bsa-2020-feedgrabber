import React from "react";
import UIColumn from "../../components/UI/UIColumn";
import LoaderWrapper from "../../components/LoaderWrapper";
import UICard from "../../components/UI/UICard";
import UICardBlock from "../../components/UI/UICardBlock";
import UIButton from "../../components/UI/UIButton";
import {ITeam, ITeamUserToggle} from "../../models/teams/ITeam";
import styles from "./styles.module.sass";
import {Icon, Image} from "semantic-ui-react";
import {IUserShort} from "../../models/user/types";

interface ITeamUsersBlockProps {
  currentTeam?: ITeam;
  companyUsers?: IUserShort[];
  isLoadingUsers?: boolean;

  toggleUser(request: ITeamUserToggle): void;
}

const defaultAvatar =
  "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const TeamUsersBlock: React.FunctionComponent<ITeamUsersBlockProps> = (
  {
    currentTeam,
    companyUsers,
    toggleUser,
    isLoadingUsers
  }
) => {
  return (
    <UIColumn>
      <LoaderWrapper loading={isLoadingUsers}>
        <UICard>
          <UICardBlock>
            <h3>Users</h3>
          </UICardBlock>
          {(companyUsers || []).map(user => (
            <UICardBlock key={user.id} className={styles.toggleCardBlock}>
              <div className={styles.cardUserBlock}>
                <Image src={user.avatar ?? defaultAvatar} size="mini" avatar/>
                <h4>{user.username}</h4>
                <Icon name="star outline" className={styles.cardUserStar} />
              </div>
              {currentTeam && (
                <UIButton
                  title={user.selected ? "Remove" : "Add"}
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
