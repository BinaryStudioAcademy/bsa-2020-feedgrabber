import React, { Component } from "react";
import Dropzone from "../Dropzone";
import "./styles.sass";
import Progress from "../progress";
import {Icon} from "semantic-ui-react";

class Upload extends Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfulUploaded: false
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const state = this.state;
    const promises = [];
    state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfulUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfulUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
      console.log("Request to server");
  }

  renderProgress(file) {
    const state = this.state;
    const uploadProgress = state.uploadProgress[file.name];
    if (state.uploading || state.successfulUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <Icon
            name="checkmark"
            /* style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}*/
          />
        </div>
      );
    } else {
      return null;
    }
  }

  renderActions() {
    const state = this.state;
    if (state.successfulUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfulUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={state.files.length < 0 || state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    const state = this.state;
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={state.uploading || state.successfulUploaded}
            />
          </div>
          <div className="Files">
            {state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

export default Upload;
