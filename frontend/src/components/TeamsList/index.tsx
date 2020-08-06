import React from "react";
import { Segment, Card, Icon, Image, Header as Title } from "semantic-ui-react";
import Header from "../Header";

import styles from "./styles.module.sass";

const TeamsList = ({ teams, curUser }) => {
  return (
    <div className={styles.teams_page}>
      <Header user={curUser} />
      <Segment style={{width: "70%"}}>
        <Title>
          Teams
        </Title>
        <Card.Group>
          {teams &&
          teams.map(team => (
            <Card link color="blue" fluid>
              <Card.Content header={team.name} />
              <Card.Content>
                {team.members.slice(0, 7).map(user => (
                  <Image avatar src={user.avatar} />
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