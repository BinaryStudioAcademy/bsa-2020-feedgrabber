import React, {useState} from "react";
import {Tab} from "semantic-ui-react";
import VideoUrl from "./UrlVideo";
import styles from "./styles.module.sass";
import ImageUrl from "./ImageUrl";
import InternalStorageUpload from "./InternalStorageUpload";

interface IFileUploadProps {
    allowedTypes: string[];
    maxFilesCount: number;
    maxFilesSize: number; // в МБ
}

const FileUpload: React.FC<IFileUploadProps> = ({maxFilesCount, maxFilesSize, allowedTypes}) => {
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [allTypesFiles, setAllTypesFiles] = useState([]);
    const [videoUrl, setVideoUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const onFilesAdded = async (addedFiles, filesType) => {
        let newFiles = files.length + addedFiles.length <= maxFilesCount
            ? addedFiles : addedFiles.slice(0, maxFilesCount - files.length);

        newFiles = checkFilesSize(newFiles);

        if (filesType === "image") {
            const imageFiles = [];
            for (const file of newFiles) {
                if (file.type.startsWith("image"))
                    imageFiles.push(file);
            }
            setFiles(files.concat(imageFiles));
            loadImages(imageFiles);
        } else {
            setFiles(files.concat(newFiles));
            setAllTypesFiles(allTypesFiles.concat(newFiles));
        }
    };

    const loadImages = async newFiles => {
        const addedImages = [];
        const promises = [];
        for (const file of newFiles) {
            promises.push(loadImage(file, addedImages));
        }
        await Promise.all(promises);
        setImages(images.concat(addedImages));
    };

    const loadImage = (file, files) => {
        if (!file.type.startsWith("image")) {
            return null;
        }

        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(files.push(reader.result));
            };

            reader.readAsDataURL(file);
        });
    };

    const checkFilesSize = checkedFiles => {
        let filesSize = 0;
        for (const file of files) {
            filesSize += file.size / (1024 * 1024);
        }

        const result = [];
        checkedFiles.forEach(file => {
            filesSize += file.size / (1024 * 1024);
            if (filesSize <= maxFilesSize) {
                result.push(file);
            }
        });

        return result;
    };

    /* const deleteNotAllowedFiles = files => {
        const result = [];
        files.forEach(file => {
            if (allowedTypes.includes(file.type)) {
                result.push(file);
            }
        });

        return result;
    };*/

    const mapImages = files => {
        return files.map(image => {
            return <img className="ui medium image" src={image} alt="File loaded successfully" />;
        });
    };

    const mapAllTypes = files => {
        return files.map(file => {
            return <div className={styles.file}>{file.name}</div>;
        });
    };

    const panes = [
        {
            menuItem: "Add images",
            render: () =>
                <Tab.Pane>
                    <InternalStorageUpload
                        files={images}
                        onFilesAdded={e => onFilesAdded(e, "image") }
                        disabled={files.length >= maxFilesCount}
                        mapFiles={mapImages} />
                </Tab.Pane>
        },
        {
            menuItem: "Add files",
            render: () =>
                <Tab.Pane>
                    <InternalStorageUpload
                        files={allTypesFiles}
                        onFilesAdded={e => onFilesAdded(e, "all")}
                        disabled={files.length >= maxFilesCount}
                        mapFiles={mapAllTypes}/>
                </Tab.Pane>
        },
        {
            menuItem: "Video URL",
            render: () =>
                <Tab.Pane>
                    <VideoUrl url={videoUrl} onChange={setVideoUrl} />
                </Tab.Pane>
        },
        {
            menuItem: "Image URL",
            render: () =>
                <Tab.Pane>
                    <ImageUrl url={imageUrl} onChange={setImageUrl} />
                </Tab.Pane>
        }
    ];

    return (
        <div className={styles.segment}>
            <Tab className={styles.tab} panes={panes} />
        </div>
    );
};

export default FileUpload;
