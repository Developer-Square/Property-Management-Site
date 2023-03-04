/* eslint-disable no-restricted-globals */
import React, { useMemo } from 'react';
import { Typography, Box, Stack, Rating } from '@pankod/refine-mui';
import { useDelete, useGetIdentity, useShow } from '@pankod/refine-core';
import { useParams, useNavigate } from '@pankod/refine-react-router-v6';
import {
  AddBoxRounded,
  ArrowBackIosOutlined,
  BalconyOutlined,
  BathtubOutlined,
  BedOutlined,
  GpsFixedOutlined,
  KitchenOutlined,
  LocalParkingOutlined,
  Place,
  SmokingRoomsOutlined,
  WifiOutlined,
} from '@mui/icons-material';
import { ImageViewer, PropertyDetailsAgent } from 'components';

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
  const [value, setValue] = React.useState(4);

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
      mutate({
        resource: 'properties',
        id: id as string,
      });
      navigate('/properties');
    }
  };

  if (isLoading || isPropertyLoading)
    return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;

  return (
    <Box
      mt={{ xs: '45px', sm: '0px' }}
      sx={{
        borderRadius: '15px',
        padding: '20px',
        backgroundColor: '#fcfcfc',
        width: '100%',
      }}
    >
      <Stack direction='row' alignItems='center'>
        <ArrowBackIosOutlined
          sx={{
            color: '#11142d',
            marginRight: '15px',
            fontSize: '19px',
            cursor: 'pointer',
          }}
          onClick={() => navigate(-1)}
        />
        <Typography fontSize={25} fontWeight={700} color='#11142d'>
          Details
        </Typography>
      </Stack>
      <Box
        mt='20px'
        display='flex'
        flexDirection={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <Box flex={1}>
          <ImageViewer propertyDetails={propertyDetails} />
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
                <Rating
                  name='simple-controlled'
                  value={value}
                  onChange={(event, newValue: any) => {
                    setValue(newValue);
                  }}
                />
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
                  {propertyDetails.propertyStatus === 'for-rent' ? (
                    <Typography fontSize={14} color='#808191' mb={0.5}>
                      / month
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Stack>
              </Box>
            </Stack>

            <Stack direction='column' mt='20px'>
              <Typography
                mb='20px'
                fontSize={18}
                fontWeight={500}
                color='#11142D'
              >
                Facility
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(3, 1fr)',
                    sm: 'repeat(4, 1fr)',
                  },
                }}
              >
                <Stack direction='row' gap='7px'>
                  <BedOutlined />
                  <Typography fontSize={14} fontWeight={500} color='#11142D'>
                    4 Beds
                  </Typography>
                </Stack>
                <Stack direction='row' gap='7px'>
                  <BathtubOutlined />
                  <Typography fontSize={14} fontWeight={500} color='#11142D'>
                    2 Baths
                  </Typography>
                </Stack>
                <Stack direction='row' gap='7px'>
                  <GpsFixedOutlined />
                  <Typography fontSize={14} fontWeight={500} color='#11142D'>
                    28M Area
                  </Typography>
                </Stack>
                <Stack direction='row' gap='7px' mt={{ xs: '10px', sm: '0px' }}>
                  <SmokingRoomsOutlined />
                  <Typography fontSize={14} fontWeight={500} color='#11142D'>
                    Smoking Area
                  </Typography>
                </Stack>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  marginTop: '20px',
                  gridTemplateColumns: {
                    xs: 'repeat(3, 1fr)',
                    sm: 'repeat(4, 1fr)',
                  },
                }}
              >
                <Stack direction='row' gap='7px'>
                  <KitchenOutlined />
                  <Typography fontSize={14} fontWeight={500} color='#11142D'>
                    Kitchen
                  </Typography>
                </Stack>
                <Stack direction='row' gap='7px'>
                  <BalconyOutlined />
                  <Typography fontSize={14} fontWeight={500} color='#11142D'>
                    Balcony
                  </Typography>
                </Stack>
                <Stack direction='row' gap='7px'>
                  <WifiOutlined />
                  <Typography fontSize={14} fontWeight={500} color='#11142D'>
                    Wifi
                  </Typography>
                </Stack>
                <Stack direction='row' gap='7px' mt={{ xs: '10px', sm: '0px' }}>
                  <LocalParkingOutlined />
                  <Typography fontSize={14} fontWeight={500} color='#11142D'>
                    Parking
                  </Typography>
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
