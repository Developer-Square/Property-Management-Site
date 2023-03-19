import React, { SetStateAction, useState } from 'react';
import { Stack, Box, Typography, Modal } from '@pankod/refine-mui';
import { isMobile } from 'react-device-detect';
import { Close } from '@mui/icons-material';

import ImageCarousel from './ImageCarousel';

const Image = ({ image, title }: { image: string; title: string }) => (
  <img
    src={image}
    alt={title}
    style={{
      objectFit: 'cover',
      borderRadius: '10px',
      height: '100%',
      maxHeight: '160px',
    }}
    className='property_details-img'
  />
);

const ModalContainer = ({
  open,
  setModal,
  propertyDetails,
}: {
  open: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
  propertyDetails: any;
}) => (
  <Modal
    open={open}
    onClose={() => setModal(false)}
    aria-labelledby='modal-modal-title'
    aria-describedby='modal-modal-description'
  >
    <Box
      sx={{
        position: 'absolute',
        top: { xs: '30%', sm: '50%' },
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '360px', sm: '600px' },
        bgcolor: 'background.paper',
        padding: { xs: '10px', sm: '15px' },
        outline: 'none',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          color: '#11142d',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: { xs: '10px', sm: '20px' },
        }}
      >
        <Box>View Images</Box>
        <Close onClick={() => setModal(false)} />
      </Box>
      <ImageCarousel propertyDetails={propertyDetails} />
    </Box>
  </Modal>
);

const ImageViewer = ({ propertyDetails }: { propertyDetails: any }) => {
  const [open, setModal] = useState(false);
  return (
    <Box>
      <ModalContainer
        open={open}
        setModal={setModal}
        propertyDetails={propertyDetails}
      />
      <Stack direction='row' gap={isMobile ? 1 : 2.5}>
        <img
          src={propertyDetails.photos[0]}
          alt={propertyDetails.title}
          style={{
            objectFit: 'cover',
            borderRadius: '10px',
            width: propertyDetails.photos >= 3 ? '80%' : '100%',
            height: 'auto',
            maxHeight: '346px',
          }}
          className='property_details-img'
        />
        {/* Todo: check back when it's an array */}
        {propertyDetails.photos.length >= 3 ? (
          <Stack
            direction='column'
            gap={isMobile ? 1 : 2.5}
            sx={{ widht: '20%', height: 'auto' }}
          >
            <Image
              image={propertyDetails.photos[1]}
              title={propertyDetails.title}
            />
            <Box
              sx={{ position: 'relative', height: '100%', cursor: 'pointer' }}
              onClick={() => setModal(true)}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  background: 'rgba(0, 0, 0, 0.6)',
                  maxHeight: '160px',
                  height: '100%',
                  width: '100%',
                  borderRadius: '10px',
                }}
              ></Box>
              <Typography
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fcfcfc',
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                {propertyDetails.photos.length}+ Photos
              </Typography>
              <Image
                image={propertyDetails.photos[0]}
                title={propertyDetails.title}
              />
            </Box>
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </Box>
  );
};

export default ImageViewer;
