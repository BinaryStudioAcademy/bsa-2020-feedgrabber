import React, {createRef, FC, RefObject, useState} from "react";
import "./styles.sass";
import {Icon} from "semantic-ui-react";

interface IDropzoneProps {
  disabled: boolean;
  onFilesAdded: (files: any) => void;
  className?: string;
}

const Dropzone: FC<IDropzoneProps> = ({ disabled, onFilesAdded, className }) => {
  const fileInputRef: RefObject<HTMLElement> = createRef();
  const [ highlight, setHighlight ] = useState(false);

  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  const handleFilesAdded = evt => {
    if (disabled) return;
    const files = evt.target.files;
    if (onFilesAdded) {
      const array = fileListToArray(files);
      onFilesAdded(array);
    }
  };

  const onDragOver = event => {
    event.preventDefault();
    if (disabled) return;
    setHighlight(true);
  };

  const onDragLeave = event => {
    setHighlight(false);
  };

  const onDrop = event => {
    event.preventDefault();
    if (disabled) return;
    const files = event.dataTransfer.files;
    if (onFilesAdded) {
      const array = fileListToArray(files);
      onFilesAdded(array);
    }
    setHighlight(false);
  };

  const fileListToArray = list => {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  };

  return (
      <div className={className}>
        <div
            className={`Dropzone ${highlight ? "Highlight" : ""}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={openFileDialog}
            style={{ cursor: disabled ? "default" : "pointer" }}
        >
          <input
              ref={fileInputRef as any}
              className="FileInput"
              type="file"
              multiple
              onChange={handleFilesAdded}
          />
          <Icon name="cloud upload" size="big" />
          <span>Upload Files</span>
        </div>
      </div>
  );
};

export default Dropzone;
