import React from "react";
import { Segment, Card, Icon, Image, Header as Title } from "semantic-ui-react";
import { ITeam } from "models/ITeam";

import styles from "./styles.module.sass";

export interface ITeamsListProps {
  teams: ITeam[];
}

const TeamsList: React.FunctionComponent<ITeamsListProps> = ({ teams }) => {
  return (
    <div className={styles.teams_page}>
      <Segment style={{width: "70%"}}>
        <Title>
          Teams
        </Title>
        <Card.Group>
          {teams.map(team => (
            <Card link color="blue" fluid key={team.id}>
              <Card.Content header={team.name} />
              <Card.Content>
                {team.members.slice(0, 7).map(user => (
                  <Image avatar src={user.avatar} key={user.id} />
                ))}
                {team.members.length > 2 &&
                <Icon name="angle right" size="large" />}
              </Card.Content>
              <Card.Content extra>
                <Icon name="users" />{team.members.length} Members
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Segment>
    </div>
  );
};

TeamsList.defaultProps = {
  teams: []
};

export default TeamsList;