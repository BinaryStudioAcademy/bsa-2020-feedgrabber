import {IRequestShort} from "models/report/IReport";
import React, {FC, useState} from "react";
import {history} from "../../../helpers/history.helper";
import {toastr} from 'react-redux-toastr';
import {Button, Card, Icon, Modal, Progress} from "semantic-ui-react";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import {closeRequestRoutine} from "../../../sagas/request/routines";
import moment from "moment";
import { useTranslation } from "react-i18next";

type Props = {
    request: IRequestShort;
    showQuestionnaireTitle?: boolean;
    closeRequest?: typeof closeRequestRoutine;
    isClosed: boolean;
    questionnaireId?: string;
    teamId?: string;
};

export const RequestItem: FC<Props> = (
  {request,
    closeRequest,
    isClosed,
    questionnaireId,
    teamId,
    showQuestionnaireTitle
  }
) => {
    const [open, setOpen] = useState(false);
    const [t] = useTranslation();

    function handleClick() {
        if (isClosed) {
            history.push(`/report/${request.requestId}`);
        } else {
            toastr.info(t("Request is in progress"));
            setOpen(true);
        }
    }

    function handleRequestClose() {
        !isClosed &&
        closeRequest({
          requestId: request.requestId, questionnaireId: questionnaireId, teamId: teamId
        });
        setOpen(false);
    }

    const getProgressBar = () => (
        isClosed ?
            <Progress percent={calcDate(request.expirationDate, request.creationDate, request.closeDate)}
                      success label={`${t("Closed")} ${moment(request.closeDate).calendar()}`}/>
            : <Progress active percent={calcDate(request.expirationDate, request.creationDate)}
                        label={request.expirationDate
                            ? `${("Deadline on")} ${moment(request.expirationDate).calendar()}`
                            : t("Without expiration")}
                        color="blue"
            />
    );

    return (
        <>
            <Card fluid raised={true} onClick={handleClick} color="blue">
                <Card.Content textAlign="center">
                    <Card.Header>
                      {showQuestionnaireTitle && (
                        <>
                          {request.questionnaireTitle}
                          <br />
                         </>
                      )}
                      {t("Created by")} {request.requestMaker.username}
                    </Card.Header>
                    <Card.Meta>{moment(request.creationDate).calendar()}</Card.Meta>
                    {request.targetUser && (
                      <Card.Description>{t("target user")}: {request.targetUser.username}</Card.Description>
                    )}
                </Card.Content>
                <Card.Content extra>
                    {getProgressBar()}
                    <Icon name='user'/>
                    {request.userCount} {t("Attended")}
                </Card.Content>
            </Card>
            <Modal
                closeIcon
                basic
                open={open}
                size="mini"
                onClose={() => setOpen(false)}
            >
                <Header icon='archive' content='Close Request & View Report'/>
                <Modal.Content>
                    <p>{t("Do you really want to")}
                        <strong style={{color: "red"}}>{t("close the request?")}</strong>
                    </p>
                    {t("Respondents")} <strong>{t("won't be able to answer")}</strong> {t("anymore")}.
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='green' inverted onClick={() => setOpen(false)}>
                        <Icon name='remove' /> {("No")}
                    </Button>
                    <Button color='red' inverted onClick={handleRequestClose}>
                        <Icon name='checkmark' /> {t("Yes")}
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

function calcDate(deadline: string, create: string, close?: string): number {
    const diff = -2*3600*1000;
    const now = Date.now();
    const start = new Date(create).getTime() + diff;
    const end = new Date(deadline).getTime();
    return ((new Date(close).getTime() || now) - start) / (end - start) * 100;
}

