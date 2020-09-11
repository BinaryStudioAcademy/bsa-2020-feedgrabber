import React, {FC, useEffect, useState} from "react";
import {Tab, Button} from "semantic-ui-react";
import styles from "./styles.module.sass";
import InternalStorageUpload from "./InternalStorageUpload";
import {IQuestionResponse} from "../../../models/IQuestionResponse";
import {IFileUploadQuestion} from "../../../models/forms/Questions/IQuesion";
import {fileTypes as allTypes} from "../../ComponentsQuestions/FileUploadQuestion/types";
import ImageUrl from "./ImageUrl";
import VideoUrl from "./UrlVideo";
import apiClient from "../../../helpers/apiClient";
import {IAnswerBody} from '../../../models/forms/Response/types';
import {useTranslation} from "react-i18next";

export interface IFileUploadResponse {
    response?: IAnswerBody;
}

const FileUploadResponse: FC<IQuestionResponse<IFileUploadQuestion> & IFileUploadResponse> = ({
                                                                                                  question,
                                                                                                  answerHandler,
                                                                                                  response
                                                                                              }) => {
    const [links, setLinks] = useState([]); // links to uploaded files
    const [url, setUrl] = useState(''); // url to photo or video
    const [files, setFiles] = useState((response as string[])?.map(link => ({id: link, name: link, link})) || []);
    const [error, setError] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const filesNumber = question.details.filesNumber;
    const maxFileSize = question.details.filesSize * (1024 * 1024);
    const filesType = question.details.filesType;
    const [t] = useTranslation();

    const updateLinks = () => setLinks(files.map(file => file.link));

    useEffect(() => {
        updateLinks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    useEffect(() => {
        if (url !== '') {
            answerHandler?.([...links, url]);
        } else {
            answerHandler?.([...links]);
        }
        setIsUploading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [links]);

    const onFilesAdded = async addedFiles => {
        setError('');
        setIsUploading(true);
        let newFiles: any[];
        if (files.length + addedFiles.length <= filesNumber) {
            newFiles = addedFiles;
        } else {
            newFiles = addedFiles.slice(0, filesNumber - files.length);
            setError(`${t("Maximum number of files")} ${filesNumber}`);
            return;
        }
        deleteNotAllowedFiles(newFiles);
        await uploadFiles(addedFiles);
        answerHandler?.(
            [...links, url]
        );
        setIsUploading(false);
    };

    const onUrlInsert = url => {
        setUrl(url);
        if (url) {
            if (url !== '') {
                answerHandler?.([...links, url]);
            } else {
                answerHandler?.([...links]);
            }
        } else {
            answerHandler?.([...links]);
        }
    };

    const uploadFiles = async newFiles => {
        const promises = [];
        for (const file of newFiles) {
            if (file.size > maxFileSize) {
                setError(`${t("Maximum file size")} ${question.details.filesSize} ${t("MB")}`);
                continue;
            }
            // start sending files to the server
            promises.push(uploadFile(file));
        }
        const result = [];
        (await Promise.all(promises))
            .forEach(res => {
                result.push(res);
                // setFiles([...files, res]);
            });
        setFiles(result);
    };

    const uploadFile = file => {
        const formData = new FormData();
        formData.append('file', file, file.name);
        try {
            return apiClient.post('/api/files/response', formData).then(res => ({
                id: res.data.id,
                link: res.data.link,
                name: file.name
            }));
        } catch (err) {
            return new Promise((resolve, reject) => reject('error'));
        }
    };

    const deleteNotAllowedFiles = files => {
        const result = [];
        files.forEach(file => {
            if (file.type.startsWith(filesType)) {
                result.push(file);
            } else {
                setError(`Only ${filesType}s allowed`);
            }
        });
        return result;
    };

    const deleteFile = id => {
        apiClient.delete(`/api/files?id=${id}`).catch(err => {
            // handle deletion error
        });
        const updatedFiles = files.filter(file => file.id !== id);
        setFiles(updatedFiles);
    };

    const mapFiles = files => {
        return files?.map(file => {
            return (
                <div className={styles.fileItem} key={file.id}>
                    <div>{file.name}</div>
                    {response === undefined
                        ? <Button icon='close' type="button" onClick={() => deleteFile(file.id)} size="tiny"/>
                        : <a href={file.link} target="_blank" rel={'noopener noreferrer'}>
                            <Button type="button" icon="angle double right" size="tiny"/>
                        </a>
                    }
                </div>
            );
        });
    };

    const onClear = () => {
        files.map(file => file.id).map(id => deleteFile(id));
        setLinks([]);
        setUrl('');
        setError('');
        answerHandler?.(null);
    };

    const getPanes = () => {
        switch (filesType) {
            case allTypes.image:
            case allTypes.video: {
                return [
                    {
                        menuItem: t(`Add ${filesType}`),
                        render: () =>
                            <Tab.Pane>
                                <InternalStorageUpload
                                    onFilesAdded={onFilesAdded}
                                    disabled={files.length >= filesNumber || !response}
                                    isUploading={isUploading}
                                    mapFiles={mapFiles}
                                    onClear={onClear}
                                    error={error}
                                    files={files}
                                />
                            </Tab.Pane>
                    },
                    {
                        menuItem: `URL`,
                        render: () =>
                            <Tab.Pane>
                                {filesType === allTypes.image
                                    ? <ImageUrl url={url} onChange={onUrlInsert}
                                                disabled={(response as string[]).length !== 0}/>
                                    : <VideoUrl url={url} onChange={onUrlInsert}
                                                disabled={(response as string[]).length !== 0}/>
                                }
                            </Tab.Pane>
                    }
                ];
            }
            default:
                return null;
        }
    };

    return (
        <div>
            <div className={styles.restrictions}>
                {t("Maximum number of files")}: {question.details.filesNumber}
            </div>
            <div className={styles.restrictions}>
                {t("Maximum size of files")}: {question.details.filesSize} {t("MB")}
            </div>
            <Tab className={styles.tab} panes={getPanes()}/>
        </div>
    );

};

export default FileUploadResponse;
