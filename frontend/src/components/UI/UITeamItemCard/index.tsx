import React, {FC, useState} from 'react';
import {Icon} from 'semantic-ui-react';
import styles from "./styles.module.sass";
import {ITeam, ITeamShort} from "../../../models/teams/ITeam";
import UIUserItemCard from "../UIUserItemCard";

interface IUITeamItemCardProps {
  team: ITeamShort;
  onClick?: () => void;
  selected?: boolean;
}

const UITeamItemCard: FC<IUITeamItemCardProps> =
    ({
       team,
       selected,
       onClick
     }) => {

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
              {team.membersAmount}
            </div>
          </div>
      );
    };

export default UITeamItemCard;