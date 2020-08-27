import React, {FC, useState} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {addQuestionnaireRoutine, saveAndGetQuestionnaireRoutine} from "../../sagas/qustionnaires/routines";
import {history} from "../../helpers/history.helper";
import {toastr} from 'react-redux-toastr';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";

const RedirectFormEditor: FC<Props> = ({current, saveAndGet}) => {
    const [title, setTitle] = useState<string>();
    const [open, setOpen] = useState<boolean>(!current.id);

    function handleCancel() {
        history.goBack();
        setOpen(false);
    }

    function handleSubmit() {
        saveAndGet({title: title ?? "New Form"});
        setOpen(false);
        toastr.success("Form created");
    }

    current.id && history.push(`/questionnaires/${current.id}`);

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title" onClose={handleCancel}>
            <DialogTitle id="form-dialog-title">Create New Form</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter Form title or use default
                </DialogContentText>
                <TextField
                    autoFocus
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="New Form"
                    margin="dense"
                    label="Form title"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
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
