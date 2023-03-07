import React, { useContext, useState } from 'react';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';

import CustomButton from './CustomButton';
import { PropertyProps } from 'interfaces/common';
import PropertyCard from './PropertyCard';
import { shuffle } from 'utils/shuffle';
import { ColorModeContext } from 'contexts';

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
  const { mode } = useContext(ColorModeContext);

  const handleSort = (btn: string) => {
    setActiveButton(btn);
    setSortedProperties(shuffle(properties));
  };

  return (
    <Box
      mt={2.5}
      borderRadius='15px'
      padding='20px'
      bgcolor={mode === 'light' ? '#fcfcfc' : '#1A1D1F'}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        gap={{ xs: 2, sm: 0 }}
      >
        <Typography
          fontSize={18}
          fontWeight={600}
          color={mode === 'light' ? '#11142d' : '#EFEFEF'}
        >
          {type === 'home' ? 'Property List' : `${type} Properties`}
        </Typography>
        <Stack gap={1} direction='row' flexWrap='wrap'>
          <CustomButton
            title='Popular'
            backgroundColor={
              activeButton === 'Popular'
                ? '#475BE8'
                : mode === 'light'
                ? '#F7F7F7'
                : '#111315'
            }
            color={activeButton === 'Popular' ? '#fcfcfc' : '#808191'}
            active={properties.length < 0}
            handleClick={() => handleSort('Popular')}
          />
          <CustomButton
            title='Recommended'
            backgroundColor={
              activeButton === 'Recommended'
                ? '#475BE8'
                : mode === 'light'
                ? '#F7F7F7'
                : '#111315'
            }
            color={activeButton === 'Recommended' ? '#fcfcfc' : '#808191'}
            active={properties.length < 0}
            handleClick={() => handleSort('Recommended')}
          />
          <CustomButton
            title='View All'
            backgroundColor='#475BE8'
            color='#fcfcfc'
            handleClick={() => navigate('/properties')}
          />
        </Stack>
      </Stack>
      {properties.length > 0 ? (
        <Box
          mt={2.5}
          id='property-cards'
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1fr)',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
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
              mode={mode}
            />
          ))}
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
