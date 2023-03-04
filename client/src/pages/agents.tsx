import React, { useMemo } from 'react';
import { useTable } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { Add } from '@mui/icons-material';

import { AgentCard, CustomButton, Pagination, SearchField } from 'components';

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

  const allAgents: any[] = data?.data ?? [];

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      'field' in item ? item : []
    );

    return {
      name: logicalFilters.find((item) => item.field === 'name')?.value || '',
    };
  }, [filters]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;

  return (
    <Box mt={{ xs: '45px', lg: '0px' }}>
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
        sx={{
          marginTop: '20px',
          backgroundColor: '#fcfcfc',
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
          gap: '20px',
          backgroundColor: '#fcfcfc',
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
