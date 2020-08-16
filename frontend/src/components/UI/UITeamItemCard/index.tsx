import React, {FC, useState} from 'react';
import {Icon} from 'semantic-ui-react';
import styles from "./styles.module.sass";
import {ITeam} from "../../../models/teams/ITeam";
import UIUserItemCard from "../UIUserItemCard";

interface IUITeamItemCardProps {
  team: ITeam;
  onClick?: () => void;
  selected?: boolean;
}

const UITeamItemCard: FC<IUITeamItemCardProps> =
    ({
       team,
       selected,
       onClick
     }) => {
      const [showUsers, setShowUsers] = useState(false);

      return (
          <div id={team.id}
               className={[styles.teamGrid, selected && styles.selected].join(' ')}>
            <div className={[styles.teamName, onClick && styles.hoverable].join(' ')}
                 onClick={onClick}
            >
              {team.name}
            </div>
            <div className={styles.teamInfo}>
              <Icon name='users'/>
              {team.members.length}
              <span className={styles.showHide}
                    onClick={event => {
                      event.preventDefault();
                      setShowUsers(!showUsers);
                    }}
              > {showUsers ? 'Hide Members' : 'Show Members'}</span>
            </div>

            {showUsers &&
            (<div>
                  {team.members.map(user => (
                      <UIUserItemCard
                          key={user.id}
                          firstName={'Username: ' + user.username}
                          avatar={user.avatar}/>))
                  }
                </div>
            )}

          </div>
      );
    };

export default UITeamItemCard;