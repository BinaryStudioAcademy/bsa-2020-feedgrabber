import styles from "../styles.module.sass";
import Dropzone from "../Dropzone";
import React from "react";
import {Button} from "semantic-ui-react";

const InternalStorageUpload = ({ onFilesAdded, mapFiles, disabled, onClear, error }) => {
    return (
        <div className={styles.fileUpload} >
            <Dropzone
                className={styles.dropzone}
                disabled={disabled}
                onFilesAdded={onFilesAdded}
            />
            <div className={styles.filesContainer}>
                {mapFiles()}
            </div>
            <div className={styles.wrap}>
                <div className={styles.errorMessage}>{error}</div>
                <Button
                    className={styles.clearButton} color="blue"
                    onClick={onClear}
                >
                    Clear
                </Button>
            </div>
        </div>
    );
};

export default InternalStorageUpload;
