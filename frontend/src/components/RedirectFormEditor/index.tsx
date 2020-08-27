import React, {FC, useEffect, useState} from "react";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import {saveAndGetQuestionnaireRoutine} from "../../sagas/qustionnaires/routines";
import {history} from "../../helpers/history.helper";
import {toastr} from 'react-redux-toastr';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import moment from "moment";

const RedirectFormEditor: FC<Props> = ({current, saveAndGet}) => {
    const [title, setTitle] = useState<string>(`New Form created ${moment().calendar()}`);
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

    useEffect(() => {
        current.id && history.push(`/questionnaires/${current.id}`);
    }, [current]);

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title" onClose={handleCancel}>
            <DialogTitle>
                Type In Form Title
            </DialogTitle>
            <DialogContent>
                <DialogContentText variant="h6">
                    Looks like you don't have currently edited form, create new!
                </DialogContentText>
                <TextField
                    autoFocus
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    margin="dense"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} color="primary">
                    Add
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
