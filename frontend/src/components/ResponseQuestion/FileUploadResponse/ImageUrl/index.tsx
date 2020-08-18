import {Input} from "semantic-ui-react";
import React, {useState} from "react";
import styles from "../styles.module.sass";

const ImageUrl = ({ url, onChange }) => {
    const [error, setError] = useState(false);

    const handleUrlChange = e => {
        onChange(e.target.value);
        setError(false);
    };

    return (
        <div className={styles.urlUpload}>
          <Input
              className={styles.urlInput}
              type="text"
              placeholder="URL"
              value={url}
              onChange={handleUrlChange}
          />
            {url && !error && <img className="ui image large" onError={() => setError(true)} src={url} alt={url} />}
            {error && <div>Error</div>}
      </div>
    );
};

export default ImageUrl;
