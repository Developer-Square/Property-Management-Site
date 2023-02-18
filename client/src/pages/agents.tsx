import React from 'react';
import { useList } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { Add } from '@mui/icons-material';

import { AgentCard, CustomButton } from 'components';

const Agents = () => {
  const { data, isLoading, isError } = useList({
    resource: 'users',
  });
  const navigate = useNavigate();

  const allAgents: any[] = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between'>
        <Typography fontSize={25} fontWeight={700} color='#11142d'>
          Agents List
        </Typography>
        <CustomButton
          title='Add Agent'
          handleClick={() => navigate('/agents/create')}
          backgroundColor='#475be8'
          color='#fcfcfc'
          icon={<Add />}
        />
      </Stack>

      <Box
        mt='20px'
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: '#fcfcfc',
        }}
      >
        {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            {...agent}
            noOfProperties={agent.allProperties.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Agents;
