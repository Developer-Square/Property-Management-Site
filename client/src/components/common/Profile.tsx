/* eslint-disable no-restricted-globals */
import { Phone, Place } from '@mui/icons-material';
import { useDelete, useLogout } from '@pankod/refine-core';
import { Box, Stack, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import EmailVerification from 'components/profile/EmailVerification';
import { ColorModeContext } from 'contexts';

import { ProfileProps } from 'interfaces/common';
import { useContext, useState } from 'react';
import EditPopover from './EditPopover';
import PropertyList from './PropertyList';

function checkImage(url: any) {
  let img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const Profile = ({
  type,
  name,
  avatar,
  country,
  email,
  phone,
  properties,
  emailVerified,
}: ProfileProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const { mutate } = useDelete();
  const { mutate: mutateLogout } = useLogout();
  const { mode } = useContext(ColorModeContext);

  const user = localStorage.getItem('user') || '';
  const userObj = JSON.parse(user);
  const id = userObj.userid;

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

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
      mutateLogout();
    }
  };
  return (
    <Box>
      <Typography
        fontSize={25}
        fontWeight={700}
        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        {type} Profile
      </Typography>

      <Box
        mt='20px'
        borderRadius='15px'
        padding='20px'
        bgcolor={mode === 'light' ? '#fcfcfc' : '#1A1D1F'}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2.5,
          }}
        >
          <Box
            sx={{
              height: { xs: '162px', sm: '320px' },
            }}
          >
            <img
              src='https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
              width={340}
              height='100%'
              alt='abstract'
              className='my_profile-bg'
            />
          </Box>
          <Box
            flex={1}
            sx={{
              marginTop: { md: '58px' },
              marginLeft: { xs: '20px', md: '0px' },
            }}
          >
            <Box
              flex={1}
              display='flex'
              flexDirection={{ xs: 'column', md: 'row' }}
              gap='20px'
            >
              <img
                src={
                  checkImage(avatar)
                    ? avatar
                    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
                }
                width={78}
                height={78}
                alt='user_profile'
                className='my_profile_user-img'
              />
              <Box
                flex={1}
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                gap='30px'
              >
                <Stack direction='row' justifyContent='space-between'>
                  <Stack direction='column'>
                    <Typography
                      fontSize={22}
                      fontWeight={600}
                      color={mode === 'light' ? '#11142d' : '#EFEFEF'}
                    >
                      {name}
                    </Typography>
                    <Typography fontSize={16} color='#808191'>
                      Real estate Agent
                    </Typography>
                  </Stack>
                  <Box display={{ xs: 'block', sm: 'none' }}>
                    <EditPopover
                      popoverId={popoverId}
                      anchorEl={anchorEl}
                      setAnchorEl={setAnchorEl}
                      open={open}
                      handleUpdate={handleUpdate}
                      handleDelete={handleDelete}
                    />
                  </Box>
                </Stack>

                <Stack direction='column' gap='30px'>
                  <Stack gap='15px'>
                    <Typography fontSize={14} fontWeight={500} color='#808191'>
                      Address
                    </Typography>
                    <Box
                      display='flex'
                      flexDirection='row'
                      alignItems='center'
                      gap='10px'
                    >
                      <Place
                        sx={{ color: mode === 'light' ? '#11142d' : '#EFEFEF' }}
                      />
                      <Typography
                        fontSize={14}
                        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
                      >
                        {country}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction='row' flexWrap='wrap' gap='20px' pb={4}>
                    <Stack flex={1} gap='15px'>
                      <Typography
                        fontSize={14}
                        fontWeight={500}
                        color='#808191'
                      >
                        Phone Number
                      </Typography>
                      <Box
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        gap='10px'
                      >
                        <Phone
                          sx={{
                            color: mode === 'light' ? '#11142d' : '#EFEFEF',
                          }}
                        />
                        <Typography
                          fontSize={14}
                          color={mode === 'light' ? '#11142d' : '#EFEFEF'}
                          noWrap
                        >
                          {phone}
                        </Typography>
                      </Box>
                    </Stack>
                    <EmailVerification
                      email={email}
                      emailVerified={emailVerified}
                    />
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Box display={{ xs: 'none', sm: 'block' }}>
            <EditPopover
              popoverId={popoverId}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              open={open}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </Box>
        </Box>
      </Box>
      <PropertyList type={type} properties={properties} />
    </Box>
  );
};

export default Profile;
