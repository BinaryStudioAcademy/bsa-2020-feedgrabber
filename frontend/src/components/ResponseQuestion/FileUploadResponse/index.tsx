import React, { FC, useState } from "react";
import { Label, Tab, Button } from "semantic-ui-react";
import styles from "./styles.module.sass";
import InternalStorageUpload from "./InternalStorageUpload";
import { IQuestionResponse } from "../../../models/IQuestionResponse";
import { IFileUploadQuestion, QuestionType } from "../../../models/forms/Questions/IQuesion";
import { fileTypes as allTypes } from "../../ComponentsQuestions/FileUploadQuestion/types";
import ImageUrl from "./ImageUrl";
import VideoUrl from "./UrlVideo";
import apiClient from "../../../helpers/apiClient";
import { IAnswerBody } from '../../../models/forms/Response/types';

export interface IFileUploadResponse {
  response?: IAnswerBody;
}

const FileUploadResponse: FC<IQuestionResponse<IFileUploadQuestion> & IFileUploadResponse> = ({
  question,
  answerHandler,
  response
}) => {
    console.log(response);
    const [links, setLinks] = useState([]); // links to uploaded files
    const [url, setUrl] = useState(''); // url to photo or video
    const [files, setFiles] = useState((response as string[])?.map(link => ({ id: link, name: link, link})) || []);
    const [error, setError] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const filesNumber = question.details.filesNumber;
    const maxFileSize = question.details.filesSize * (1024 * 1024);
    const filesType = question.details.filesType;

    const onFilesAdded = async addedFiles => {
      setError('');
      setIsUploading(true);
      let newFiles: any[];
      if (files.length + addedFiles.length <= filesNumber) {
        newFiles = addedFiles;
      } else {
        newFiles = addedFiles.slice(0, filesNumber - files.length);
        setError(`Maximum number of files ${filesNumber}`);
        return;
      }
      newFiles = deleteNotAllowedFiles(newFiles);

      await uploadFiles(addedFiles);
      answerHandler?.(
        [...links, url]
      );
      setIsUploading(false);
    };

    const onUrlInsert = url => {
      setUrl(url);
      if (url) {
        console.log('url + links');
        console.log([...links, url]);
        answerHandler?.([...links, url]);
      } else {
        console.log('links');
        console.log([...links]);
        answerHandler?.([...links]);
      }
    };

    const uploadFiles = async newFiles => {
      const promises = [];
      for (const file of newFiles) {
        if (file.size > maxFileSize) {
          setError(`Maximum file size is ${question.details.filesSize} MB`);
          continue;
        }
        // start sending files to the server
        promises.push(uploadFile(file));
      }
      (await Promise.all(promises))
        .map(res => {
          console.log(res);
          setFiles([...files, res]);
        });
      updateLinks();
    };

   const updateLinks = () => setLinks(files.map(file => file.id));

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
        console.log(err);
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
        console.log(err);
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
             ? <Button icon='close' onClick={() => deleteFile(file.id)} size="tiny" />
             : <a href={file.link} target="_blank"><Button icon="angle double right" size="tiny"/></a>}
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
              menuItem: `Add ${filesType}s`,
              render: () =>
                <Tab.Pane>
                  <InternalStorageUpload
                    onFilesAdded={onFilesAdded}
                    disabled={files.length >= filesNumber}
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
                    ? <ImageUrl url={url} onChange={onUrlInsert} disabled={response !== undefined}/>
                    : <VideoUrl url={url} onChange={onUrlInsert} disabled={response !== undefined}/>
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
      <div className={styles.segment}>
        <span>Maximum number of the files: {question.details.filesNumber}</span><br />
        <span>Maximum size of the file: {question.details.filesSize}</span>
        <Tab className={styles.tab} panes={getPanes()}/>
      </div>
    );
  };

export default FileUploadResponse;
