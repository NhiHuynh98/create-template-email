import React from 'react';
import { Image } from 'antd'


interface ImagePreviewProps {
  img: any
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ img }) => (
  <Image
    width={200}
    preview={{
      destroyOnClose: true,
      imageRender: () => (
        <video
          muted
          width="100%"
          controls
          src={img.thumbUrl}
        />
      ),
      toolbarRender: () => null,
    }}
    src={img.thumbUrl}
  />
);

export default ImagePreview;