import React, { useContext } from 'react';
import { Box, Typography, Stack } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { useList } from '@pankod/refine-core';

import CustomButton from 'components/common/CustomButton';
import { ColorModeContext } from 'contexts';

const TopAgentItem = ({
  name,
  avatar,
  mode,
}: {
  name: string;
  avatar: string;
  mode: string;
}) => (
  <Stack direction='row' marginBottom='15px'>
    <img
      src={avatar}
      alt='Profile'
      style={{
        borderRadius: '15px',
        marginRight: '12px',
        width: '40px',
        height: '40px',
      }}
    />
    <Stack direction='column'>
      <Typography
        fontSize={14}
        fontWeight={500}
        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        {name}
      </Typography>
      <Typography fontSize={12} fontWeight={400} color='#808191'>
        Real Estate Agent
      </Typography>
    </Stack>
  </Stack>
);

const TopAgent = () => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const { data, isLoading, isError } = useList({
    resource: 'users',
  });

  const allAgents: any[] = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;
  return (
    <Box
      sx={{
        padding: '20px',
        width: '100%',
        background: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
        borderRadius: '10px',
        flex: 1,
      }}
    >
      <Stack direction='column'>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          marginBottom='20px'
        >
          <Typography
            fontSize={18}
            fontWeight={600}
            color={mode === 'light' ? '#11142d' : '#EFEFEF'}
          >
            Top Agent
          </Typography>
          <CustomButton
            title='View all'
            color={mode === 'light' ? '#808191' : '#EFEFEF'}
            backgroundColor='transparent'
            border='1px solid #E4E4E4'
            handleClick={() => navigate('/agents')}
          />
        </Stack>
        <Box
          sx={{
            maxHeight: '360px',
            height: '100%',
            overflow: 'scroll',
          }}
        >
          {allAgents.length ? (
            allAgents.map((agent) => (
              <TopAgentItem
                key={agent._id}
                name={agent.name}
                avatar={agent.avatar}
                mode={mode}
              />
            ))
          ) : (
            <Typography>No Agents yet</Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default TopAgent;
