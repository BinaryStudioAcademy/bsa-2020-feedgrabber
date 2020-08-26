import {IRequestShort} from "models/report/IReport";
import React, {FC, useState} from "react";
import {history} from "../../../helpers/history.helper";
import {toastr} from 'react-redux-toastr';
import {Button, Card, Icon, Modal, Progress} from "semantic-ui-react";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import {closeRequestRoutine} from "../../../sagas/request/routines";

type Props = {
    request: IRequestShort;
    closeRequest?: typeof closeRequestRoutine;
    isClosed: boolean;
    questionnaireId?: string;
};

export const RequestItem: FC<Props> = ({request, closeRequest, isClosed, questionnaireId}) => {
    const [open, setOpen] = useState(false);

    function handleClick() {
        if (isClosed) {
            history.push(`/report/${request.requestId}`);
        }
        else {
            toastr.info("Request is in progress");
            setOpen(true);
        }
    }

    function handleRequestClose() {
        !isClosed &&
        closeRequest({requestId: request.requestId, questionnaireId: questionnaireId});
        setOpen(false);
    }

    return (
        <>
            <Card fluid raised={true} onClick={handleClick} color="blue">
                <Card.Content textAlign="center">
                    <Card.Header>Created by {request.requestMaker.username}</Card.Header>
                    <Card.Meta>at {request.creationDate.substr(0, 10)}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Progress active percent={calcDate(request.expirationDate)}
                              label={request.expirationDate
                                       ? `Deadline on ${request.expirationDate?.substr(0, 10)}`
                                       : 'Without expiration'}
                              color="blue"
                    />
                        <Icon name='user'/>
                    {request.userCount} Attended
                </Card.Content>
            </Card>
            <Modal
                closeIcon
                open={open}
                size="mini"
                onClose={() => setOpen(false)}
            >
                <Header icon='archive' content='Close Request & View Report'/>
                <Modal.Content as="h2">
                    <p>Do you really want to close request?</p>
                    Respondents won't be able to answer anymore.
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={() => setOpen(false)}>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green' onClick={handleRequestClose}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
    </>
    );
};

function calcDate(deadline: string): number {
    return Date.now() / new Date(deadline).getTime();
}

