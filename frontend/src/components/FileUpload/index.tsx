import React, {useState} from "react";
import {Container, Icon, Segment, Tab} from "semantic-ui-react";
import Upload from "./Upload";
import UrlFile from "./UrlFile";
import Progress from "./progress";

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [successfulUploaded, setSuccessfulUploaded] = useState(false);

    const onFilesAdded = newFiles => {
        const addedFiles = files.length + newFiles.length <= 10? newFiles : newFiles.slice(0, 10 - files.length);
        setFiles(files.concat(addedFiles));

        addedFiles.forEach(loadImage);
    };

    const loadImage = file => {
        const reader = new FileReader();
        reader.onload = fileSrc => {
            setImages(images.concat(fileSrc));
            console.log(fileSrc);
        };

        reader.addEventListener('load', e => {
            setImages(images.concat(e.target.result));
        });

        reader.readAsDataURL(file);
    };

    const uploadFiles = async () => {
        setUploadProgress({});
        setUploading(true);

        const promises = [];
        files.forEach(file => {
            promises.push(sendRequest(file));
        });
        try {
            await Promise.all(promises);

            setSuccessfulUploaded(true);
            setUploading(false);
        } catch (e) {
            // Not Production ready! Do some error handling here instead...
            setSuccessfulUploaded(true);
            setUploading(false);
        }
    };

    const sendRequest = file => {
        console.log("Request to server");
    };

    const renderProgress = file => {
        if (uploading || successfulUploaded) {
            return (
                <div className="ProgressWrapper">
                  <Progress progress={uploadProgress ? 100 : 0} />
                  <Icon
                      name="checkmark"
                  />
                </div>
            );
        } else {
            return null;
        }
    };

    const renderActions = () => {
        if (successfulUploaded) {
            return (
                <button
                    onClick={() => {
                        setFiles([]);
                        setSuccessfulUploaded(false);
                    }}
                >
                  Clear
                </button>
                    );
                } else {
                    return (
                        <button
                            disabled={files.length < 0 || uploading}
                            onClick={uploadFiles}
                        >
                  Upload
                </button>
                    );
                }
    };

    const panes = [
        {
            menuItem: "Add",
            render: () =>
                <Tab.Pane className="addFile">
                    <Upload
                        files={files}
                        images={images}
                        uploading={uploading}
                        successfulUploaded={successfulUploaded}
                        onFilesAdded={onFilesAdded}
                        renderProgress={renderProgress}
                        renderActions={renderActions}
                    />
                    <Container className="images">
                      {images.map(image => {
                          return <img className="ui medium image" src={image} />;
                      })}
                    </Container>
                </Tab.Pane>
        },
        {
            menuItem: "Url",
            render: () => <Tab.Pane><UrlFile/></Tab.Pane>
        },
        {
            menuItem: "Uploaded files",
            render: () => <Tab.Pane><div>Upload</div></Tab.Pane>
        }
    ];

    return (
        <Segment>
            <Tab panes={panes}/>
        </Segment>
    );
};

export default FileUpload;
