import React, {FC, useState} from "react";
import {IUser} from "../index";
import {Card, Image} from "semantic-ui-react";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";

interface IUserCardProps {
    user: IUser;
    add: Function;
    remove: Function;
}

const UserCard: FC<IUserCardProps> = props => {
    const {user, add, remove} = props;

    const [sel, setSel] = useState(false);

    const clickHandler = e => {
        e.preventDefault();
        !sel ? add(user) : remove(user);
        setSel(!sel);
    };

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
                        {!sel ?
                            <Button onClick={clickHandler} basic color='green' content="Approve"/>
                            : <Button onClick={clickHandler} color='red' content="Decline"/>}
                    </div>
                </Card.Content>
            </Card>
        </div>

    );
};

export default UserCard;
