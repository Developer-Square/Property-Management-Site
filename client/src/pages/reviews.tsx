import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@pankod/refine-mui';
import { Pagination, ReviewCard } from 'components';
import { useTable } from '@pankod/refine-core';
import { ColorModeContext } from 'contexts';

const NavItem = ({
  title,
  active,
  setNavItem,
}: {
  title: string;
  active: string;
  setNavItem: (status: string) => void;
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
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    pageCount,
    pageSize,
    setPageSize,
  } = useTable();
  const { mode } = useContext(ColorModeContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allReviews: any[] = data?.data ?? [];

  useEffect(() => {
    if (allReviews.length) {
      if (navItem === 'all reviews') {
        setFilteredItems(allReviews);
      } else {
        const result = allReviews.filter((review) => review.status === navItem);
        setFilteredItems(result);
      }
    }
  }, [navItem, allReviews]);

  const handleFilterReviews = (status: string) => {
    setNavItem(status);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error!</Typography>;
  return (
    <Box mt={{ xs: '45px', lg: '0px' }}>
      <Typography
        fontSize={25}
        fontWeight={700}
        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        Review List
      </Typography>

      <Box
        sx={{
          marginTop: '20px',
          backgroundColor: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
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
        <NavItem
          title='All Reviews'
          active={navItem}
          setNavItem={handleFilterReviews}
        />
        <NavItem
          title='Published'
          active={navItem}
          setNavItem={handleFilterReviews}
        />
        <NavItem
          title='Deleted'
          active={navItem}
          setNavItem={handleFilterReviews}
        />
      </Box>
      <Box sx={{ marginTop: '30px' }}>
        {filteredItems.map((review) => (
          <ReviewCard
            key={review._id}
            id={review._id}
            profileUrl={review.avatar}
            ratingValue={review.rating}
            name={review.name}
            comment={review.comment}
            navItem={navItem}
            mode={mode}
          />
        ))}
      </Box>
      {allReviews.length !== 0 ? (
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

export default Reviews;
