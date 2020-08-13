import styles from "../styles.module.sass";
import Dropzone from "../Dropzone";
import React from "react";

const InternalStorageUpload = ({ images, onFilesAdded, disabled }) => {
    return (
        <div className={styles.addFile} >
            <Dropzone
                disabled={disabled}
                onFilesAdded={onFilesAdded}
            />
            <div className={styles.images}>
                {images.map(image => {
                    return <img className="ui medium image" src={image} alt="File loaded successfully" />;
                })}
            </div>
        </div>
    );
};

export default InternalStorageUpload;
