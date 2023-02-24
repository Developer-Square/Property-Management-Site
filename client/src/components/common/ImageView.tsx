import React from 'react';
import { Close } from '@mui/icons-material';
import { Stack } from '@pankod/refine-mui';

const ImageView = ({
  backendImages,
  handleRemoveImage,
}: {
  backendImages: string[];
  handleRemoveImage: (img: string) => void;
}) => {
  return (
    <>
      {backendImages.map((image: string, index: number) => (
        <Stack direction='column' key={index}>
          <Close
            onClick={() => handleRemoveImage(image)}
            sx={{ color: '#11142d', cursor: 'pointer' }}
          />
          <img
            src={image}
            alt='Property'
            style={{
              borderRadius: '10px',
              maxHeight: '249px',
              maxWidth: '230px',
              width: '100%',
              height: '100%',
              marginTop: '5px',
              marginRight: '10px',
            }}
          />
        </Stack>
      ))}
    </>
  );
};

export default ImageView;
