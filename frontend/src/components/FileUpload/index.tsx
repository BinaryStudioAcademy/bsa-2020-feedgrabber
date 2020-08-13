import React, {useState} from "react";
import { Tab } from "semantic-ui-react";
import VideoUrl from "./UrlVideo";
import Dropzone from "./Dropzone";
import styles from "./styles.module.sass";
import ImageUrl from "./ImageUrl";

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const onFilesAdded = async addedFiles => {
        const newFiles = files.length + addedFiles.length <= 10 ? addedFiles : addedFiles.slice(0, 10 - files.length);
        setFiles(files.concat(newFiles));

        const addedImages = [];
        const promises = [];
        for (const file of newFiles) {
            promises.push(loadImage(file, addedImages));
        }
        await Promise.all(promises);
        setImages(images.concat(addedImages));
    };

    const loadImage = (file, images) => {
        if (!file.type.startsWith("image")) {
            return null;
        }

        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(images.push(reader.result));
            };

            reader.readAsDataURL(file);
        });
    };

    const panes = [
        {
            menuItem: "Add",
            render: () =>
                <Tab.Pane>
                    <div className={styles.addFile} >
                        <Dropzone
                            disabled={uploading || files.length >= 10}
                            onFilesAdded={onFilesAdded}
                        />
                        <div className={styles.images}>
                            {images.map(image => {
                              return <img className="ui medium image" src={image} />;
                            })}
                        </div>
                    </div>
                </Tab.Pane>
        },
        {
            menuItem: "Video URL",
            render: () => <Tab.Pane><VideoUrl/></Tab.Pane>
        },
        {
            menuItem: "Image URL",
            render: () => <Tab.Pane><ImageUrl/></Tab.Pane>
        }
    ];

    return (
        <div className={styles.segment} >
            <Tab
                className={styles.tab}
                panes={panes}
            />
        </div>
    );
};

export default FileUpload;
