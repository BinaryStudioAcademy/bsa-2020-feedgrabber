import {Input} from "semantic-ui-react";
import React, {useState} from "react";
import ReactPlayer from "react-player";

const UrlFile = () => {
  const [url, setUrl] = useState('');

  return (
      <div>
          <Input type="text" placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} />
          <ReactPlayer url={url} />
      </div>
  );
};

export default UrlFile;
