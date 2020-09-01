import React, {FC, useEffect, useState} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {saveAndGetQuestionnaireRoutine} from "../../sagas/qustionnaires/routines";
import {history} from "../../helpers/history.helper";
import {toastr} from 'react-redux-toastr';
import moment from "moment";
import {Modal, Button, Icon, Input} from "semantic-ui-react";
import {useTranslation} from "react-i18next";

const RedirectFormEditor: FC<Props> = ({current, saveAndGet}) => {
    const [title, setTitle] = useState<string>(`New Form created ${moment().calendar()}`);
    const [open, setOpen] = useState<boolean>(!current.id);
    const [t] = useTranslation();

    function handleCancel() {
        history.goBack();
        setOpen(false);
    }

    function handleSubmit() {
        saveAndGet({title: title ?? `New Form created ${moment().calendar()}`});
        setOpen(false);
        toastr.success("Form created");
    }

    useEffect(() => {
        current.id && history.push(`/questionnaires/${current.id}`);
    }, [current]);

    return (
    <Modal
        open={open}
        size="small"
        onClose={handleCancel}
        style={{textAlign: "center"}}
    >
        <Modal.Content>
            <Modal.Description as="h3">
                <p>{t("Looks like you don't have currently edited form")}</p>
                {t("Let's create new right now!")}
            </Modal.Description>
            <Input
                icon='hashtag'
                iconPosition='left'
                label={{ tag: true, content: 'Add Title' }}
                labelPosition='right'
                value={title}
                fluid
                onChange={e => setTitle(e.target.value)}
            />
        </Modal.Content>
        <Modal.Actions>
            <Button primary onClick={handleSubmit}>
                {t("Create")} <Icon name='chevron right' />
            </Button>
        </Modal.Actions>
    </Modal>
    );
};

const mapState = (state: IAppState) => ({
    current: state.questionnaires.current.get
});

const mapDispatch = {
    saveAndGet: saveAndGetQuestionnaireRoutine
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

export default connector(RedirectFormEditor);
