import React, { useState, useEffect, FC } from 'react';
import { useTranslation } from "react-i18next";
import apiClient from "../../helpers/apiClient";
import { connect, ConnectedProps } from 'react-redux';
import { Image, Icon, Button, Header } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import {
  loadCompanyFeedItemRoutine,
  saveCompanyFeedItemRoutine,
  createCompanyFeedItemRoutine
} from '../../sagas/companyFeed/routines';
import { toastr } from 'react-redux-toastr';
import { ICompanyFeedItem } from '../../models/companyFeed/ICompanyFeedItem';
import { IAppState } from "../../models/IAppState";

import styles from './styles.module.sass';
import UIButton from "../UI/UIButton";

const MAX_TITLE = 255;

const CompanyFeedItemCreation: FC<ConnectedFeedCreationProps & { match }> = ({
  match,
  feedItem,
  loadFeedItem,
  createFeedItem,
  saveFeedItem
}) => {
  const history = useHistory();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [item, setItem] = useState<ICompanyFeedItem>(undefined);
  // const [image, setImage] = useState<string>(undefined);
  const [t] = useTranslation();

  useEffect(() => {
    const id = match.params.id;
    if (id === 'new') {
      loadFeedItem();
      return;
    }
    loadFeedItem(id);
  }, [loadFeedItem, match.params.id]);

  const isValid = () => {
    return item && item.title && item.body;
  };

  const handleSubmit = () => {
    // here we send new item to backend
    if (!isValid()) {
      return;
    }
    if (item.id) {
      saveFeedItem(item);
    } else {
      const newItem = {
        title: item.title,
        body: item.body,
        type: item.type,
        imageId: item.image?.id
      };
      createFeedItem(newItem);
    }
    history.push('/company');
  };

  useEffect(() => {
    setItem(feedItem);
    // setImage(feedItem?.imageId);
  }, [feedItem]);

  const uploadFile = file => {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient.post('/api/image', formData).then(res => {
      // setImage(res.data);
      return res.data;
    });
  };

  const handleUploadPhoto = async files => {
    const file = files[0];
    setIsUploading(true);
    try {
      if (!file.type.startsWith('image')) {
        return;
      }
      const image = await uploadFile(file);
      setIsUploading(false);
      setItem({ ...item, image: image });
    } catch (error) {
      toastr.error('Unable to upload images');
      setItem({ ...item, image: null });
    }
    setIsUploading(false);
  };

  return (
    <div className={styles.new_feed_wrapper}>
    <div className={styles.new_feed_item_page}>
      <Header as="h3">{t('Create a new feed item')}</Header>
      <input placeholder={t('Title')} type="text"
             value={item?.title || ''}
             className={styles.feed_item_input}
             onChange={e => setItem(e.target.value.length <= MAX_TITLE
               ? { ...item, title: e.target.value }
               : { ...item})
             }
      />
      <textarea placeholder={t('What\'s up')}
                value={item?.body || ''}
                className={styles.feed_item_textarea}
                onChange={e => setItem({ ...item, body: e.target.value })} />
      {item?.image && (
          <Image src={item.image.link} size='small' alt="image" bordered />
      )}
      <Button color="teal" icon labelPosition="left" as="label"
              loading={isUploading} disabled={isUploading} className={styles.button}>
        <Icon name="image" />
        {t('Attach image')}
        <input name="image" type="file" multiple
               onChange={e => handleUploadPhoto(e.target.files)} hidden />
      </Button>
      <UIButton
        submit
        center
        onClick={handleSubmit}
        disabled={!isValid()} title={t('Submit')}
      />
    </div>
    </div>
  );
};

const mapStateToProps = (rootState: IAppState) => ({
    feedItem: rootState.companyFeed.current
});

const mapDispatchToProps = {
    loadFeedItem: loadCompanyFeedItemRoutine,
    saveFeedItem: saveCompanyFeedItemRoutine,
    createFeedItem: createCompanyFeedItemRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectedFeedCreationProps = ConnectedProps<typeof connector>;

export default connector(CompanyFeedItemCreation);
