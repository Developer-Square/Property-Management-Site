/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { ChatBubble, Place, Delete, Edit, Phone } from '@mui/icons-material';
import { useNavigate } from '@pankod/refine-react-router-v6';

import CustomButton from 'components/common/CustomButton';

interface IPropertyDetailsAgent {
  checkImage: (image: string) => boolean;
  handleDeleteProperty: () => void;
  propertyDetails: any;
  isCurrentUser: boolean | undefined;
}

const PropertyDetailsAgent = ({
  checkImage,
  handleDeleteProperty,
  propertyDetails,
  isCurrentUser,
}: IPropertyDetailsAgent) => {
  const navigate = useNavigate();
  return (
    <Box
      width='100%'
      flex={1}
      display='flex'
      flexDirection='column'
      gap='20px'
      sx={{
        maxWidth: { md: '100%', lg: '326px' },
      }}
    >
      <Stack
        width='100%'
        p={2}
        direction='column'
        justifyContent='center'
        alignItems='center'
        border='1px solid #E4E4E4'
        borderRadius={2}
      >
        <Stack
          mt={2}
          justifyContent='center'
          alignItems='center'
          textAlign='center'
        >
          <img
            src={
              checkImage(propertyDetails.creator.avatar)
                ? propertyDetails.creator.avatar
                : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
            }
            alt='avatar'
            width={90}
            height={90}
            style={{
              borderRadius: '100%',
              objectFit: 'cover',
            }}
          />

          <Box mt='15px'>
            <Typography fontSize={18} fontWeight={600} color='#11142D'>
              {propertyDetails.creator.name}
            </Typography>
            <Typography mt='5px' fontSize={14} fontWeight={400} color='#808191'>
              Agent
            </Typography>
          </Box>

          <Stack mt='15px' direction='row' alignItems='center' gap={1}>
            <Place sx={{ color: '#808191' }} />
            <Typography fontSize={14} fontWeight={400} color='#808191'>
              Nairobi, Kenya
            </Typography>
          </Stack>

          <Typography mt={1} fontSize={16} fontWeight={600} color='#11142D'>
            {propertyDetails.creator.allProperties.length} Properties
          </Typography>
        </Stack>

        <Stack width='100%' mt='25px' direction='row' flexWrap='wrap' gap={2}>
          <CustomButton
            title={!isCurrentUser ? 'Message' : 'Edit'}
            backgroundColor='#475BE8'
            color='#FCFCFC'
            fullWidth
            icon={!isCurrentUser ? <ChatBubble /> : <Edit />}
            handleClick={() => {
              if (isCurrentUser) {
                navigate(`/properties/edit/${propertyDetails._id}`);
              }
            }}
          />
          <CustomButton
            title={!isCurrentUser ? 'Call' : 'Delete'}
            backgroundColor={!isCurrentUser ? '#2ED480' : '#d42e2e'}
            color='#FCFCFC'
            fullWidth
            icon={!isCurrentUser ? <Phone /> : <Delete />}
            handleClick={() => {
              if (isCurrentUser) handleDeleteProperty();
            }}
          />
        </Stack>
      </Stack>

      <Stack>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35853727176!2d36.707308948466846!3d-1.3028617924598906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi!5e0!3m2!1sen!2ske!4v1677905339381!5m2!1sen!2ske'
          width='100%'
          height='306'
          style={{ border: 0, borderRadius: 10 }}
          allowFullScreen={false}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </Stack>

      <Box>
        <CustomButton
          title={
            propertyDetails.propertyStatus === 'for-rent'
              ? 'Book Now'
              : 'Buy Now'
          }
          backgroundColor='#475BE8'
          color='#FCFCFC'
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default PropertyDetailsAgent;
