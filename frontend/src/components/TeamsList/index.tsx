import React from "react";
import { Segment, Card, Icon, Image, Header as Title } from "semantic-ui-react";
import Header, { IUser } from "../Header";

import styles from "./styles.module.sass";

export interface IMember {
  id: string;
  avatar: string;
  username: string;
}
export interface ITeam {
  id: string;
  name: string;
  members: IMember[];
}
export interface ITeamsListProps {
  teams: ITeam[];
  user: IUser;
}

const TeamsList: React.FunctionComponent<ITeamsListProps> = ({ teams, user }) => {
  return (
    <div className={styles.teams_page}>
      <Header user={user} />
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
  teams: [{
    id: '533b5230-1b9f-11a8-9629-c7eca82aa7bd',
    name: 'Bsa-2020',
    members: [{
      id: '533b5230-1b9f-11e8-9629-c7eca82aa7bd',
      username: 'pasha',
      avatar: 'https://i.imgur.com/hG4Th4U.jpg'}, {
      id: '',
      username: 'misa',
      avatar: 'https://i.imgur.com/hIjmHms.jpg'}
      ]
  }]
};

export default TeamsList;