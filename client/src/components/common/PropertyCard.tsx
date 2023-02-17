import React from 'react';
import {
  PlaceOutlined,
  Bed,
  CompassCalibrationOutlined,
} from '@mui/icons-material';
import { Link } from '@pankod/refine-react-router-v6';
import {
  Box,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@pankod/refine-mui';

import { PropertyCardProps } from 'interfaces/property';
import { randomNumber } from 'utils/randomNumber';

const PropertyCard = ({
  id,
  title,
  location,
  price,
  photos,
}: PropertyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/properties/show/${id}`}
      id='property-card'
      sx={{
        display: 'flex',
        padding: '10px',
        height: 'fit-content',
        '&:hover': {
          boxShadow: '0 22px 2px rgba(176, 176, 176, 0.1)',
        },
        cursor: 'pointer',
      }}
      elevation={0}
    >
      <CardMedia
        component='img'
        width='100%'
        height={150}
        image={photos[0]}
        alt='card image'
        sx={{ borderRadius: '10px', marginRight: '10px' }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          paddingX: '5px',
          paddingY: '0px !important',
        }}
      >
        <Box
          px={1.5}
          py={0.5}
          borderRadius={1}
          bgcolor='#dadefa'
          height='fit-content'
          width='fit-content'
        >
          <Typography fontSize={12} fontWeight={600} color='#457be8'>
            Ksh {price}
          </Typography>
        </Box>
        <Stack direction='column' gap={1}>
          <Typography fontSize={14} fontWeight={500} color='#11142d'>
            {title}
          </Typography>
          <Stack
            direction='row'
            gap={0.5}
            alignItems='center'
            justifyContent='flex-start'
          >
            <PlaceOutlined
              sx={{ fontSize: 18, color: '#11142d', marginTop: 0.5 }}
            />
            <Typography fontSize={14} color='#808191'>
              {location}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction='row' marginTop={3}>
          <Stack direction='row' marginRight={3} alignItems='center'>
            <Bed />
            <Typography
              marginLeft={1}
              fontSize={12}
              color='#11142d'
              fontWeight={600}
            >
              {randomNumber(7)} Beds
            </Typography>
          </Stack>
          <Stack direction='row' alignItems='center'>
            <CompassCalibrationOutlined />
            <Typography
              marginLeft={1}
              fontSize={12}
              color='#11142d'
              fontWeight={600}
            >
              {randomNumber(170)}M
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
