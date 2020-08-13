import {Input} from "semantic-ui-react";
import React, {useState} from "react";
import ReactPlayer from "react-player";
import styles from "../styles.module.sass";

const VideoUrl = () => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);

  const handleUrlChange = e => {
      setUrl(e.target.value);
      setError(false);
  };

  return (
      <div className={styles.urlUpload}>
          <Input className={styles.urlInput} type="text" placeholder="URL" onChange={handleUrlChange} />
          {url && !error && <ReactPlayer onError={() => setError(true)} url={url} />}
          {error && <div>Error</div>}
      </div>
  );
};

export default VideoUrl;
