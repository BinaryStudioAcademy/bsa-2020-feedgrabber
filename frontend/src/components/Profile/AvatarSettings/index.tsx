import React, {ChangeEvent, useState} from "react";
import { Grid, Image, Button } from 'semantic-ui-react';
import ImageCropModal from "../../ImageCropModal";
import {useTranslation} from "react-i18next";

interface IAvatarSettingsProps {
  avatar?: string;
  save(image: any): void;
}

const defaultAvatar =
  "https://40y2ct3ukiiqtpomj3dvyhc1-wpengine.netdna-ssl.com/wp-content/uploads/icon-avatar-default.png";

const AvatarSettings: React.FC<IAvatarSettingsProps> = ({ avatar, save}) => {

  const [src, setSource] = useState<string | ArrayBuffer>(undefined);
  const [fileName, setFileName] = useState('avatar');
  const [t] = useTranslation();

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => setSource(reader.result),
        false
      );
      const file = e.target.files[0];
      setFileName(file.name);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Grid container textAlign="center" style={{ paddingTop: 30 }}>
        <Grid.Row>
          <Grid.Column>
            <Image centered src={avatar ?? defaultAvatar} size="medium" circular />
            <br />
            <Button icon as="label" color="teal" size="small">
              <span>{t("Set image")}</span>
              <input name="image" type="file" onChange={onSelectFile} hidden />
            </Button>
          </Grid.Column>
        </Grid.Row>
        {src && (
          <ImageCropModal
            close={() => setSource(undefined)}
            src={src}
            fileName={fileName}
            save={save}
          />
        )}
      </Grid>
    </div>
  );
};

export default AvatarSettings;
