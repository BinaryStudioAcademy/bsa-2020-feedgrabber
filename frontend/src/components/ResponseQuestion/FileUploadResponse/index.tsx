import React, { FC, useState } from "react";
import { Label, Tab } from "semantic-ui-react";
import styles from "./styles.module.sass";
import InternalStorageUpload from "./InternalStorageUpload";
import { IQuestionResponse } from "../../../models/IQuestionResponse";
import { IFileUploadQuestion, QuestionType } from "../../../models/forms/Questions/IQuesion";
import { fileTypes as allTypes } from "../../ComponentsQuestions/FileUploadQuestion/types";
import ImageUrl from "./ImageUrl";
import VideoUrl from "./UrlVideo";
import apiClient from "../../../helpers/apiClient";

const FileUploadResponse: FC<IQuestionResponse<IFileUploadQuestion>> =
  ({question = { details: { filesNumber: 3, filesSize: 3, filesType: allTypes.image } }, answerHandler}) => {
    const [links, setLinks] = useState([]); // links to uploaded files
    const [url, setUrl] = useState(''); // url to photo or video
    const [files, setFiles] = useState([]); // files data
    const [error, setError] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const filesNumber = question.details.filesNumber;
    const maxFilesSize = question.details.filesSize * (1024 * 1024);
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
      newFiles = checkFilesSize(deleteNotAllowedFiles(newFiles));

      await uploadFiles(addedFiles);
      answerHandler?.(
        [...links, url]
      );
      setFiles([...files, ...newFiles]);
      setIsUploading(false);
    };

    const onUrlInsert = url => {
      setUrl(url);
      if (!url) {
        return;
      }
      answerHandler?.(
        [...links, url]
      );
    };

    const uploadFiles = async files => {
      const promises = [];
      for (const file of files) {
        // start sending files to the server
        promises.push(uploadFile(file));
      }
      const resultLinks = (await Promise.all(promises))
        .map(res => {
          console.log(res.data);
          return res.data.link;
        });
      setLinks([...links, ...resultLinks]);
    };

    const uploadFile = file => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      return apiClient.post('/api/files/response', formData);
    };

    const checkFilesSize = checkedFiles => {
      let currentFilesSize = 0;
      for (const file of files) {
        currentFilesSize += file.size;
      }

      const result = [];
      checkedFiles.forEach(file => {
        if (currentFilesSize + file.size <= maxFilesSize) {
          result.push(file);
          currentFilesSize += file.size;
        } else {
          setError(`Maximum files size: ${question.details.filesSize} MB`);
        }
      });

      return result;
    };

    const deleteNotAllowedFiles = files => {
      const result = [];
      files.forEach(file => {
        if (file.type.startsWith(filesType)) {
          result.push(file);
        } else {
          setError(`Only ${filesType} allowed`);
        }
      });
      return result;
    };

    const mapImages = images => {
      return images?.map(image => {
        return <img className="ui medium image" src={image} alt="File loaded successfully"/>;
      });
    };

    const mapVideos = files => {
      return files?.map(file => {
        return <Label className={styles.file}>
          {`${file.name} 
                (${Math.round(file.size / (1024 * 1024) * 100) / 100} MB)`}
        </Label>;
      });
    };

    const onClear = () => {
      setFiles([]);
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
                    mapFiles={filesType === allTypes.image ? mapImages : mapVideos}
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
                    ? <ImageUrl url={url} onChange={onUrlInsert}/>
                    : <VideoUrl url={url} onChange={onUrlInsert}/>
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
        <span>Maximum number of the files: {question.details.filesNumber}</span>
        <span>Maximum size of the file: {question.details.filesSize}</span>
        <Tab className={styles.tab} panes={getPanes()}/>
      </div>
    );
  };

export default FileUploadResponse;
