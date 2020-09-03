import React, { useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal, Button } from 'semantic-ui-react';
import {useTranslation} from "react-i18next";

interface IImageCropModalProps {
  close(): void;
  save(image: any): void;
  src: any;
  fileName: string;
}

const ImageCropModal: React.FC<IImageCropModalProps> = ({ close, save, src, fileName }) => {
  const [imgRef, setImageRef] = useState<HTMLImageElement>(undefined);
  const [t] = useTranslation();

  const initCrop = {
    x: 10,
    y: 10,
    width: 300,
    height: 300
  };
  const [crop, setCrop] = useState<Crop>(initCrop);

  const onImageLoaded = (image: HTMLImageElement) => {
    setImageRef(image);
  };

  const getCroppedImg = (image: HTMLImageElement, localCrop: Crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = localCrop.width;
    canvas.height = localCrop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      localCrop.x * scaleX,
      localCrop.y * scaleY,
      localCrop.width * scaleX,
      localCrop.height * scaleY,
      0,
      0,
      localCrop.width,
      localCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }

        resolve(blob);
      }, 'image/jpeg', 1);
    });
  };

  const saveImage = async () => {
    const croppedImage = await getCroppedImg(imgRef, crop);
    save(croppedImage);
    close();
  };

  return (
    <Modal centered={false} open onClose={() => close()}>
      <Modal.Content>
        {src && (
          <div>
            <ReactCrop
              circularCrop
              locked
              src={src}
              crop={crop}
              onImageLoaded={onImageLoaded}
              onChange={newCrop => setCrop(newCrop)}
            />
          </div>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={close}>
          <span>{t("Cancel")}</span>
        </Button>
        <Button color="teal" onClick={saveImage}>
          <span>{t("Confirm")}</span>
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ImageCropModal;
