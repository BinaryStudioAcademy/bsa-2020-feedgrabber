import React, {useState} from "react";
import { Tab } from "semantic-ui-react";
import VideoUrl from "./UrlVideo";
import styles from "./styles.module.sass";
import ImageUrl from "./ImageUrl";
import InternalStorageUpload from "./InternalStorageUpload";

interface IFileUploadProps {
    maxFilesCount: number;
    maxFilesSize: number; // в МБ
}

const FileUpload: React.FC<IFileUploadProps> = ({ maxFilesCount, maxFilesSize  }) => {
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [videoUrl, setVideoUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const onFilesAdded = async addedFiles => {
        let newFiles = files.length + addedFiles.length <= maxFilesCount
            ? addedFiles : addedFiles.slice(0, maxFilesCount - files.length);

        newFiles = checkFilesSize(newFiles);
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

    const panes = [
        {
            menuItem: "Add",
            render: () =>
                <Tab.Pane>
                    <InternalStorageUpload
                        images={images}
                        onFilesAdded={onFilesAdded}
                        disabled={files.length >= maxFilesCount}
                    />
                </Tab.Pane>
        },
        {
            menuItem: "Video URL",
            render: () =>
                <Tab.Pane>
                    <VideoUrl url={videoUrl} onChange={setVideoUrl}/>
                </Tab.Pane>
        },
        {
            menuItem: "Image URL",
            render: () =>
                <Tab.Pane>
                    <ImageUrl url={imageUrl} onChange={setImageUrl}/>
                </Tab.Pane>
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
