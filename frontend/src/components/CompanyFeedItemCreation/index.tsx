import React, { useState } from 'react';
import UIContent from "../UI/UIContent";
import UIButton from "../UI/UIButton";
import UIColumn from "../UI/UIColumn";
import { Image, Icon, Button, Header } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

import styles from './styles.module.sass';

const CompanyFeedItem = () => {
  const history = useHistory();
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleSubmit = () => {
    // here we send this new item to backend
    const newItem = {
      title,
      text,
      images
    };
    console.log({ newItem });
    history.goBack();
  };

  const uploadFile = file => {
    // upload image and return the link
    return new Promise(resolve => resolve('https://i.imgur.com/4gfjYyI.png'));
  };

  const handleUploadPhotos = async files => {
    console.log('handleUploadPhotos');
    setIsUploading(true);
    try {
      const newLinks = [];
      for (const file of files) {
        console.log({ file });
        newLinks.push(await uploadFile(file));
      }
      setIsUploading(false);
      console.log(newLinks);
      setImages(newLinks);
    } catch (error) {
      console.log(error);
      setImages([]);
    }
    setIsUploading(false);
  };

  return (
    <div className={styles.new_feed_wrapper}>
    <div className={styles.new_feed_item_page}>
      <Header as="h3">Create a new feed item</Header>
      <input placeholder="Title" type="text"
             className={styles.feed_item_input}
             onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="What's up?"
                className={styles.feed_item_textarea}
                onChange={e => setText(e.target.value)} />
      <div className={styles.images}>
        {images.map(image => {
          console.log(image);
          return (<Image src={image} size='small' key={Math.random() + '1'} alt="image" />);
        })}
      </div>
      <Button color="teal" icon labelPosition="left" as="label"
              loading={isUploading} disabled={isUploading} className={styles.button}>
        <Icon name="image" />
        Attach images
        <input name="image" type="file" multiple
               onChange={e => handleUploadPhotos(e.target.files)} hidden />
      </Button>
      <UIButton title="Submit" secondary onClick={handleSubmit} />
    </div>
    </div>
  );
};

export default CompanyFeedItem;
