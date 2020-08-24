import {IRequestShort} from "models/report/IReport";
import React, {FC} from "react";
import {history} from "../../../helpers/history.helper";
import {toastr} from 'react-redux-toastr';
import {Card, Icon, Progress} from "semantic-ui-react";

export const RequestItem: FC<{ request: IRequestShort }> = ({request}) => {

    function handleClick(id: string, closeDate: string) {
        !closeDate && history.push(`/report/${id}`);
        closeDate && toastr.warning("This request is Closed");
    }

    return (
            <Card fluid raised={true} onClick={() => handleClick(request.requestId, request.closeDate)} color="blue">
                <Card.Content textAlign="center">
                    <Card.Header>Created by {request.requestMaker.username}</Card.Header>
                    <Card.Meta>at {request.creationDate.substr(0, 10)}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Progress active percent={calcDate(request.expirationDate)}
                              label={`Deadline on ${request.expirationDate.substr(0, 10)}`}
                              color="blue"
                    />
                        <Icon name='user'/>
                    {request.userCount} Attended
                </Card.Content>
            </Card>
    );
};

function calcDate(deadline: string): number {
    return Date.now() / new Date(deadline).getTime();
}

