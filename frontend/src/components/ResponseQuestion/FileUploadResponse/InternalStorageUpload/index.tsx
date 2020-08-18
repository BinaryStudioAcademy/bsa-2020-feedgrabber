import styles from "../styles.module.sass";
import Dropzone from "../Dropzone";
import React from "react";
import {Button} from "semantic-ui-react";

const InternalStorageUpload = ({ onFilesAdded, mapFiles, disabled, onClear }) => {
    return (
        <div className={styles.addFile} >
            <Dropzone
                disabled={disabled}
                onFilesAdded={onFilesAdded}
            />
            <div className={styles.filesContainer}>
                {mapFiles()}
            </div>
            <Button
                className={styles.clearButton} color="blue"
                onClick={onClear}
            >
                Clear
            </Button>
        </div>
    );
};

export default InternalStorageUpload;
