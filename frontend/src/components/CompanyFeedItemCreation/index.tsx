import React, { useState, useEffect, FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Image, Icon, Button, Header } from 'semantic-ui-react';
// import { useHistory } from 'react-router-dom';
import {
  loadCompanyFeedItemRoutine,
  saveCompanyFeedItemRoutine
} from '../../sagas/companyFeed/routines';
import { toastr } from 'react-redux-toastr';
import { ICompanyFeedItem } from '../../models/companyFeed/ICompanyFeedItem';
import { IAppState } from "../../models/IAppState";

import styles from './styles.module.sass';

const CompanyFeedItemCreation: FC<ConnectedFeedCreationProps & { match }> = ({
  match,
  feedItem,
  loadFeedItem,
  saveFeedItem
}) => {
  // const history = useHistory();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [item, setItem] = useState<ICompanyFeedItem>(undefined);

  useEffect(() => {
    const id = match.params.id;
    if (id === 'new') {
      loadFeedItem();
      return;
    }
    loadFeedItem(id);
  }, [loadFeedItem, match.params.id]);

  const handleSubmit = () => {
    // here we send new item to backend
    console.log(item);
    saveFeedItem(item);
    // history.goBack();
  };

  useEffect(() => {
    setItem(feedItem);
  }, [feedItem]);

  const uploadFile = file => {
    // upload image and return the link
    return new Promise(resolve => resolve('https://i.imgur.com/4gfjYyI.png'));
  };

  const handleUploadPhotos = async files => {
    setIsUploading(true);
    try {
      const newLinks = [];
      for (const file of files) {
        if (!file.type.startsWith('image')) {
          continue;
        }
        newLinks.push(await uploadFile(file));
      }
      setIsUploading(false);
      setItem({ ...item, images: newLinks as string[] });
    } catch (error) {
      console.log(error);
      toastr.error('Unable to upload images');
      setItem({ ...item, images: [] });
    }
    setIsUploading(false);
  };

  return (
    <div className={styles.new_feed_wrapper}>
    <div className={styles.new_feed_item_page}>
      <Header as="h3">Create a new feed item</Header>
      <input placeholder="Title" type="text"
             value={item?.title || ''}
             className={styles.feed_item_input}
             onChange={e => setItem({ ...item, title: e.target.value })} />
      <textarea placeholder="What's up?"
                value={item?.text || ''}
                className={styles.feed_item_textarea}
                onChange={e => setItem({ ...item, text: e.target.value })} />
      {(item?.images && item.images.length !== 0) && (
        <div className={styles.images}>
          {item.images.map(image => (
            <Image src={image} size='small' key={Math.random() + '1'} alt="image" bordered />
          ))}
        </div>
      )}
      <Button color="teal" icon labelPosition="left" as="label"
              loading={isUploading} disabled={isUploading} className={styles.button}>
        <Icon name="image" />
        Attach images
        <input name="image" type="file" multiple
               onChange={e => handleUploadPhotos(e.target.files)} hidden />
      </Button>
      <Button type="submit" onClick={handleSubmit} className={styles.submit_button}>
        Submit
      </Button>
    </div>
    </div>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
    feedItem: rootState.companyFeed.currentItem
});

const mapDispatchToProps = {
    loadFeedItem: loadCompanyFeedItemRoutine,
    saveFeedItem: saveCompanyFeedItemRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectedFeedCreationProps = ConnectedProps<typeof connector>;

export default connector(CompanyFeedItemCreation);
