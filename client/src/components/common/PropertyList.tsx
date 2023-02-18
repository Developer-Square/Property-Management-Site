import React, { useState } from 'react';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { ArrowForwardIosOutlined } from '@mui/icons-material';
import { useNavigate } from '@pankod/refine-react-router-v6';

import CustomButton from './CustomButton';
import { PropertyProps } from 'interfaces/common';
import PropertyCard from './PropertyCard';
import { shuffle } from 'utils/shuffle';

const PropertyList = ({
  type,
  properties,
}: {
  type: string;
  properties: any;
}) => {
  const [activeButton, setActiveButton] = useState('Popular');
  const [sortedProperties, setSortedProperties] = useState(properties);
  const navigate = useNavigate();

  const handleSort = (btn: string) => {
    setActiveButton(btn);
    setSortedProperties(shuffle(properties));
  };

  return (
    <Box mt={2.5} borderRadius='15px' padding='20px' bgcolor='#FCFCFC'>
      <Stack direction='row' justifyContent='space-between'>
        <Typography fontSize={18} fontWeight={600} color='#11142D'>
          {type} Properties
        </Typography>
        <Stack gap={1} direction='row'>
          <CustomButton
            title='Popular'
            backgroundColor={activeButton === 'Popular' ? '#475BE8' : '#F7F7F7'}
            color={activeButton === 'Popular' ? '#fcfcfc' : '#808191'}
            active={properties.length > 0}
            handleClick={() => handleSort('Popular')}
          />
          <CustomButton
            title='Recommended'
            backgroundColor={
              activeButton === 'Recommended' ? '#475BE8' : '#F7F7F7'
            }
            color={activeButton === 'Recommended' ? '#fcfcfc' : '#808191'}
            active={properties.length > 0}
            handleClick={() => handleSort('Recommended')}
          />
          <CustomButton
            title='Newest'
            backgroundColor={activeButton === 'Newest' ? '#475BE8' : '#F7F7F7'}
            color={activeButton === 'Newest' ? '#fcfcfc' : '#808191'}
            active={properties.length > 0}
            handleClick={() => handleSort('Newest')}
          />
        </Stack>
      </Stack>
      {properties.length > 0 ? (
        <Box
          mt={2.5}
          id='property-cards'
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 3,
            position: 'relative',
          }}
        >
          {sortedProperties?.slice(0, 3).map((property: PropertyProps) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              title={property.title}
              location={property.location}
              price={property.price}
              photos={property.photos}
            />
          ))}
          <Box
            sx={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/properties')}
          >
            <ArrowForwardIosOutlined
              sx={{
                fontSize: '18px',
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography fontSize={18} fontWeight={600}>
            No properties listed yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PropertyList;
