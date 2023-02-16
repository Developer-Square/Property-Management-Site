/* eslint-disable no-restricted-globals */
import React, { useMemo } from 'react';
import { Typography, Box, Stack } from '@pankod/refine-mui';
import { useDelete, useGetIdentity, useShow } from '@pankod/refine-core';
import { useParams, useNavigate } from '@pankod/refine-react-router-v6';
import {
  ChatBubble,
  Delete,
  Edit,
  Phone,
  Place,
  Star,
} from '@mui/icons-material';
import { CustomButton, PropertyDetailsAgent } from 'components';

const checkImage = (url: any) => {
  const img = new Image();
  img.src = url;

  return img.width !== 0 && img.height !== 0;
};

const PropertyDetails = () => {
  const navigate = useNavigate();
  const { data: identity, isLoading } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();

  const { data, isError, isLoading: isPropertyLoading } = queryResult;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const propertyDetails = data?.data || {};

  const isCurrentUser = useMemo(() => {
    if (identity && Object.keys(propertyDetails).length > 0) {
      return identity.email === propertyDetails.creator.email;
    }
  }, [identity, propertyDetails]);

  const handleDeleteProperty = () => {
    const response = confirm('Are you sure you want to delete this property?');

    if (response) {
      mutate(
        {
          resource: 'properties',
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate('/properties');
          },
        }
      );
    }
  };

  if (isLoading || isPropertyLoading)
    return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;

  return (
    <Box
      sx={{
        borderRadius: '15px',
        padding: '20px',
        backgroundColor: '#fcfcfc',
        width: 'fit-content',
      }}
    >
      <Typography fontSize={25} fontWeight={700} color='#11142d'>
        Details
      </Typography>

      <Box
        mt='20px'
        display='flex'
        flexDirection={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <Box flex={1} maxWidth={764}>
          <img
            src={propertyDetails.photo}
            alt={propertyDetails.title}
            height={546}
            style={{
              objectFit: 'cover',
              borderRadius: '10px',
            }}
            className='property_details-img'
          />

          <Box mt='15px'>
            <Stack
              direction='row'
              justifyContent='space-between'
              flexWrap='wrap'
              alignItems='center'
            >
              <Typography
                fontSize={18}
                fontWeight={500}
                color='#11142d'
                textTransform='capitalize'
              >
                {propertyDetails.propertyType}
              </Typography>
              <Box>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={`star-${item}`}
                    sx={{
                      color: '#f2c94c',
                    }}
                  />
                ))}
              </Box>
            </Stack>

            <Stack
              direction='row'
              justifyContent='space-between'
              flexWrap='wrap'
              alignItems='center'
            >
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={600}
                  color='#11142d'
                  textTransform='capitalize'
                >
                  {propertyDetails.title}
                </Typography>
                <Stack mt={0.5} direction='row' alignItems='center' gap={0.5}>
                  <Place sx={{ color: '#808191' }} />
                  <Typography fontSize={14} color='#808191'>
                    {propertyDetails.location}
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  mt='10px'
                  color='#11142D'
                >
                  Price
                </Typography>
                <Stack direction='row' alignItems='flex-end' gap={1}>
                  <Typography fontSize={25} fontWeight={700} color='#475BE8'>
                    ${propertyDetails.price}
                  </Typography>
                  {propertyDetails.propertyStatus === 'rent' ? (
                    <Typography fontSize={14} color='#808191' mb={0.5}>
                      /month
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Stack>
              </Box>
            </Stack>

            <Stack mt='25px' direction='column' gap='10px'>
              <Typography fontSize={18} color='#11142D'>
                Description
              </Typography>
              <Typography fontSize={14} color='#808191'>
                {propertyDetails.description}
              </Typography>
            </Stack>
          </Box>
        </Box>

        <PropertyDetailsAgent
          checkImage={checkImage}
          handleDeleteProperty={handleDeleteProperty}
          propertyDetails={propertyDetails}
          isCurrentUser={isCurrentUser}
        />
      </Box>
    </Box>
  );
};

export default PropertyDetails;
