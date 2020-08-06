import React from "react";
import { Segment, Card, Icon, Image } from "semantic-ui-react";

const TeamsList = ({ teams }) => {
  return (
    <Segment>
    <Card.Group>
      {teams &&
      teams.map(team => (
        <Card link color="blue">
          <Card.Content header={team.name} />
          <Card.Content>
            {team.members.map(user => (
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
  }, {
    name: 'Bsa-2019',
    members: [{
      id: '533b5230-1b9f-11e8-9629-c7eca82aa7bd',
      username: 'pasha',
      avatar: 'https://i.imgur.com/Au030og.png'}, {
      id: '533b5230-1b8f-11a8-9629-c7eca82aa7bd',
      username: 'misa',
      avatar: 'https://i.imgur.com/hIjmHms.jpg'}, {
      id: '3befd790-d44f-4ec3-bea6-2e388f7ee28e',
      username: 'Asan',
      avatar: 'https://i.imgur.com/Y8DGAuj.jpg'}
    ]
  }]
};

export default TeamsList;