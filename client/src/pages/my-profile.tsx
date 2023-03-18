import React from 'react';
import { useGetIdentity, useOne } from '@pankod/refine-core';

import { Profile } from 'components';
import { Box, Typography } from '@pankod/refine-mui';

const Myprofile = () => {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.userid,
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;

  return (
    <Box mt={{ xs: '45px', lg: '0px' }}>
      <Profile
        type='My'
        name={myProfile.name}
        email={myProfile.email}
        avatar={myProfile.avatar}
        country={myProfile.country || 'Kenya'}
        phone={myProfile.phoneNumber || '+254 7934 134 313'}
        properties={myProfile.allProperties}
        emailVerified={myProfile.email_verified}
      />
    </Box>
  );
};

export default Myprofile;
