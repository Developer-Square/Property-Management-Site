import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Typography } from '@pankod/refine-mui';
import { ReviewCard } from 'components';

const NavItem = ({
  title,
  active,
  setNavItem,
}: {
  title: string;
  active: string;
  setNavItem: Dispatch<SetStateAction<string>>;
}) => (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      margin: '0 20px',
      fontSize: { xs: '13px', sm: '15px' },
      borderBottom: `${
        active === title.toLowerCase() ? '4px solid #475BE8' : 'transparent'
      }`,
      color: `${active === title.toLowerCase() ? '#475BE8' : '#808191'}`,
    }}
    onClick={() => setNavItem(title.toLowerCase())}
  >
    {title}
  </Box>
);

const Reviews = () => {
  const [navItem, setNavItem] = useState('all reviews');
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142d'>
        Review List
      </Typography>

      <Box
        sx={{
          marginTop: '20px',
          backgroundColor: '#fcfcfc',
          borderRadius: '15px',
          height: '56px',
          display: 'flex',
          flexWrap: 'wrap',
          width: {
            xs: '100%',
            sm: 388,
          },
        }}
      >
        <NavItem title='All Reviews' active={navItem} setNavItem={setNavItem} />
        <NavItem title='Published' active={navItem} setNavItem={setNavItem} />
        <NavItem title='Deleted' active={navItem} setNavItem={setNavItem} />
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        <ReviewCard />
      </Box>
    </Box>
  );
};

export default Reviews;
