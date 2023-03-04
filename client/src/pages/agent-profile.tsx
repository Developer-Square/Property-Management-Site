import React from 'react';
import { Box, Typography } from '@pankod/refine-mui';
import { useParams } from '@pankod/refine-react-router-v6';
import { useOne } from '@pankod/refine-core';

import { AgentProfileImg } from 'assets';
import { ProfileCard, DetailsCard, PropertyList } from 'components';

const AgentProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string,
  });

  const { avatar, name, email, allProperties } = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;

  return (
    <Box mt={{ xs: '45px', sm: '0px' }}>
      <Typography fontSize={25} fontWeight={700} color='#11142d'>
        Agent Details
      </Typography>

      <Box
        mt='20px'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '20px',
          borderRadius: '15px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <ProfileCard
          avatar={avatar}
          AgentProfileImg={AgentProfileImg}
          email={email}
          name={name}
          id={id}
        />

        <DetailsCard name={name} />
      </Box>
      <PropertyList type='home' properties={allProperties} />
    </Box>
  );
};

export default AgentProfile;
