/* eslint-disable no-restricted-globals */
import React from 'react';
import {
  Delete,
  Edit,
  EmailOutlined,
  LocationCity,
  Phone,
  Place,
} from '@mui/icons-material';
import { useDelete, useGetIdentity } from '@pankod/refine-core';
import { Box, Typography, Stack, Popover } from '@pankod/refine-mui';
import { Link, useNavigate } from '@pankod/refine-react-router-v6';

import { AgentCardProp, InfoBarProps } from 'interfaces/agent';

const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack
    flex={1}
    minWidth={{ xs: '100%', sm: 300 }}
    gap={{ xs: 0.5, sm: 1 }}
    direction='row'
    alignItems='center'
    flexWrap='wrap'
  >
    {icon}
    <Typography fontSize={{ xs: 12, sm: 14 }} color='#808191'>
      {name}
    </Typography>
  </Stack>
);

const AgentCard = ({
  id,
  name,
  email,
  avatar,
  noOfProperties,
}: AgentCardProp) => {
  const { data: currentUser } = useGetIdentity();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const navigate = useNavigate();
  const { mutate } = useDelete();

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  const generateLink = () => {
    if (currentUser.email === email) return '/my-profile';

    return `/agents/show/${id}`;
  };

  const handleUpdate = () => {
    navigate(`/agents/edit/${id}`);
  };
  const handleDelete = () => {
    const response = confirm('Are you sure you want to delete this agent?');

    if (response) {
      mutate({
        resource: 'users',
        id: id as string,
      });
      navigate('/agents');
    }
  };

  return (
    <Box
      width='100%'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: { xs: '15px', sm: '20px' },
        padding: '20px',
        '&:hover': {
          boxShadow: '0px 22px 45px 2px rgba(176,176,176,.1)',
        },
      }}
    >
      <Box
        sx={{
          height: { xs: '155px', sm: '230px' },
        }}
      >
        <img
          src={avatar}
          alt='user'
          width='auto'
          style={{
            borderRadius: 8,
            objectFit: 'cover',
            height: '100%',
          }}
        />
      </Box>
      <Stack
        direction='column'
        justifyContent='space-around'
        flex={1}
        gap={{ xs: '10px', sm: 2 }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Stack direction='column' flexWrap='wrap'>
            <Typography
              fontSize={{ xs: 20, sm: 22 }}
              fontWeight={600}
              color='#11142d'
            >
              {name}
            </Typography>
            <Typography fontSize={{ xs: 12, sm: 14 }} color='#808191'>
              Real-Estate Agent
            </Typography>
          </Stack>
          {currentUser.email !== email && (
            <>
              <span
                id={popoverId}
                style={{
                  fontSize: '25px',
                  cursor: 'pointer',
                  padding: '0 5px 5px 5px',
                }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  setAnchorEl(e.currentTarget)
                }
              >
                ...
              </span>

              <Popover
                id={popoverId}
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <Stack
                  direction='row'
                  gap='8px'
                  sx={{ padding: '10px', cursor: 'pointer' }}
                  onClick={handleUpdate}
                >
                  <Edit
                    sx={{
                      fontSize: '20px',
                      color: '#475BE8',
                      fontWeight: 'bold',
                    }}
                  />
                  <Typography fontSize={14} fontWeight={600} color='#475BE8'>
                    Edit Profile
                  </Typography>
                </Stack>
                <Stack
                  direction='row'
                  gap='8px'
                  sx={{ padding: '10px', cursor: 'pointer' }}
                  onClick={handleDelete}
                >
                  <Delete
                    sx={{ fontSize: '20px', color: '#c00', fontWeight: 'bold' }}
                  />
                  <Typography fontSize={14} fontWeight={600} color='#c00'>
                    Delete Profile
                  </Typography>
                </Stack>
              </Popover>
            </>
          )}
        </Stack>

        <Box
          component={Link}
          to={generateLink()}
          gap={{ xs: 1.2, sm: 2 }}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1fr)', sm: 'repeat(2, 1fr)' },
            justifyContent: 'space-between',
          }}
        >
          <InfoBar
            icon={<EmailOutlined sx={{ color: '#808191' }} />}
            name={email}
          />
          <InfoBar
            icon={<Place sx={{ color: '#808191' }} />}
            name='Nairobi, Kenya'
          />
          <InfoBar
            icon={<Phone sx={{ color: '#808191' }} />}
            name='+254 712 345 678'
          />
          <InfoBar
            icon={<LocationCity sx={{ color: '#808191' }} />}
            name={`${noOfProperties} Properties`}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default AgentCard;
