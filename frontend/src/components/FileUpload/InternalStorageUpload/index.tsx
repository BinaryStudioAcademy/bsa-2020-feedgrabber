import styles from "../styles.module.sass";
import Dropzone from "../Dropzone";
import React from "react";

const InternalStorageUpload = ({ files, onFilesAdded, disabled, mapFiles }) => {
    return (
        <div className={styles.addFile} >
            <Dropzone
                disabled={disabled}
                onFilesAdded={onFilesAdded}
            />
            <div className={styles.filesContainer}>
                {mapFiles(files)}
            </div>
        </div>
    );
};

export default InternalStorageUpload;
