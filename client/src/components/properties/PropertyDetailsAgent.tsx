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
        <img
          src='https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525'
          alt='Google Map'
          width='100%'
          height={306}
          style={{ borderRadius: 10, objectFit: 'cover' }}
        />
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
