import React, {FC} from "react";
import {IUser} from "../index";
import {Card, Image} from "semantic-ui-react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

interface IUserCardProps {
    user: IUser;
    clickHandler: (e) => void;
    isSelected: boolean;
}

const UserCard: FC<IUserCardProps> = props => {
    const {user, clickHandler, isSelected} = props;

    return (
        <div>
            <Card fluid>
                <Card.Content>
                    <Image floated="right" avatar size="huge" src={user.avatar}/>
                    <Card.Header>{user.firstname + " " + user.lastname}</Card.Header>
                    <Card.Meta>{user.username}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        {!isSelected ?
                            <Button onClick={clickHandler} basic color='green' content="Approve"/>
                            : <Button onClick={clickHandler} color='red' content="Decline"/>}
                    </div>
                </Card.Content>
            </Card>
        </div>

    );
};

export default UserCard;
