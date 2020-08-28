import styles from "../styles.module.sass";
import Dropzone from "../Dropzone";
import React from "react";
import { Button, Dimmer, Loader } from "semantic-ui-react";

const InternalStorageUpload = ({ onFilesAdded, mapFiles, disabled, onClear, error, files, isUploading }) => {
    return (
        <div className={styles.fileUpload} >
            <Dropzone
                className={styles.dropzone}
                disabled={disabled}
                onFilesAdded={onFilesAdded}
            />
            <div className={styles.filesContainer}>
                {mapFiles(files)}
                {isUploading &&
                  <Dimmer active>
                    <Loader />
                  </Dimmer>}
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
