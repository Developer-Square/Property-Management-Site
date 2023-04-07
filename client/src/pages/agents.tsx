import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTable } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { Add } from '@mui/icons-material';

import { AgentCard, CustomButton, Pagination, SearchField } from 'components';
import { ColorModeContext } from 'contexts';

const Agents = () => {
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    pageCount,
    pageSize,
    setPageSize,
    filters,
    setFilters,
  } = useTable();
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  const allAgents: any[] = data?.data ?? [];

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      'field' in item ? item : []
    );

    return {
      name: logicalFilters.find((item) => item.field === 'name')?.value || '',
    };
  }, [filters]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user as string);
    setLoggedInUser(userObj);
  }, []);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;

  return (
    <Box mt={{ xs: '45px', lg: '0px' }}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography
          fontSize={25}
          fontWeight={700}
          color={mode === 'light' ? '#11142d' : '#EFEFEF'}
        >
          Agents List
        </Typography>
        {loggedInUser?.role === 'admin' && (
          <CustomButton
            title='Add Agent'
            handleClick={() => navigate('/agents/create')}
            backgroundColor='#475be8'
            color='#fcfcfc'
            icon={<Add />}
          />
        )}
      </Stack>

      <Box
        sx={{
          marginTop: '20px',
          backgroundColor: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
          padding: '15px',
          borderRadius: '15px',
          height: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          maxWidth: '405px',
        }}
      >
        <SearchField
          field='name'
          placeholder='Search agents...'
          currentFilterValues={currentFilterValues}
          setFilters={setFilters}
        />
      </Box>

      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          borderRadius: '10px',
          gap: '20px',
          backgroundColor: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
        }}
      >
        {allAgents.map((agent) => (
          <AgentCard
            key={agent._id}
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            noOfProperties={agent.allProperties.length || agent.properties}
          />
        ))}
      </Box>
      {allAgents.length !== 0 ? (
        <Pagination
          pageSize={pageSize}
          pageCount={pageCount}
          setPageSize={setPageSize}
          current={current}
          setCurrent={setCurrent}
        />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Agents;
