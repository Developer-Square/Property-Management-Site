import React from 'react';
import { Box, Stack, Typography } from '@pankod/refine-mui';

import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { PieChart } from 'components';

function checkImage(url: any) {
  let img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const InfoBar = ({ title, value }: { title: string; value: string }) => (
  <Stack
    sx={{
      marginTop: { xs: '20px', sm: '30px' },
      display: 'flex',
      flexDirection: 'row',
      textAlign: 'left',
    }}
  >
    <Typography fontSize={14} color='#808191' sx={{ width: '60%' }}>
      {title}:
    </Typography>
    <Typography fontSize={14} color='#11142d' sx={{ width: '100%' }}>
      {value}
    </Typography>
  </Stack>
);

const SocialMediaInfo = ({
  Icon,
  title,
  link,
}: {
  Icon: any;
  title: string;
  link: string;
}) => (
  <Stack
    direction='row'
    justifyContent='space-between'
    marginTop='15px'
    textAlign='left'
    alignItems='center'
  >
    <Box sx={{ display: 'flex', alignItems: 'center', width: '40%' }}>
      <Icon
        sx={{
          color: title === 'Instagram' ? '#FE6D8E' : '#475BE8',
          marginRight: '10px',
        }}
      />
      {title}
    </Box>
    <Typography width='20%'>:</Typography>
    <Typography width='100%'>{link}</Typography>
  </Stack>
);

const ProfileCard = ({
  AgentProfileImg,
  avatar,
  email,
  name,
  id,
}: {
  AgentProfileImg: string;
  avatar: string;
  email: string;
  name: string;
  id: string | undefined;
}) => (
  <Box
    sx={{
      background: '#fcfcfc',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '15px',
    }}
  >
    <img src={AgentProfileImg} alt='Agent Profile' />
    <Box sx={{ display: 'flex' }} gap='35px'>
      <img
        src={
          checkImage(avatar)
            ? avatar
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
        }
        style={{
          position: 'relative',
          marginTop: '-20px',
          left: '7%',
          borderRadius: '50%',
        }}
        width={100}
        height={100}
        alt='user_profile'
      />
      <Stack direction='column' sx={{ marginTop: '10px', marginLeft: '0px' }}>
        <Typography fontSize={16} fontWeight={600} color='#11142D'>
          {name}
        </Typography>
        <Typography fontSize={14} color='#808191'>
          Agent
        </Typography>
      </Stack>
    </Box>
    <Box
      sx={{
        position: 'relative',
        marginTop: { xs: '15px', sm: '25px' },
        marginBottom: '34px',
        left: '7%',
      }}
    >
      <InfoBar title='Age' value='26' />
      <InfoBar title='City' value='Nairobi' />
      <InfoBar title='Country' value='Kenya' />
      <InfoBar title='Post Code' value='00100' />
      <InfoBar title='Agent ID' value={`#${id?.slice(10)}`} />
      <InfoBar title='Phone' value='+254 1235 724 242' />
      <InfoBar title='Email' value={email} />
    </Box>
  </Box>
);

const DetailsCard = ({ name }: { name: string }) => (
  <Box
    sx={{
      background: '#fcfcfc',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      width: '100%',
      borderRadius: '15px',
    }}
  >
    <Typography fontSize={18} fontWeight={600} color='#11142D'>
      Agent Details
    </Typography>
    <Box
      sx={{
        height: '1px',
        width: { xs: 'auto', sm: '100%' },
        marginTop: '15px',
        background: '#E4E4E4',
      }}
    ></Box>
    <Typography
      mt='20px'
      sx={{
        fontSize: '16px',
        fontWeight: '500',
        color: '#808191',
      }}
    >{`${name} is a talented property listing agent with 5 years of experience in the real estate industry. I've a proven track record of success and I'm known for my expertise in market trends, negotiation skills, and attention to detail. Additionally, my sassy sense of humor and ability to make even the most tedious tasks enjoyable make me a great partner to have when buying or selling a property.`}</Typography>
    <Box marginTop='31px'>
      <Typography fontSize={18} fontWeight={600} color='#11142D'>
        Social Media Info
      </Typography>
      <SocialMediaInfo
        Icon={Facebook}
        title='Facebook'
        link={`https://www.facebook.com/${name}`}
      />
      <SocialMediaInfo
        Icon={Twitter}
        title='Twitter'
        link={`https://twitter.com/${name}`}
      />
      <SocialMediaInfo
        Icon={Instagram}
        title='Instagram'
        link={`https://www.instagram.com/${name}`}
      />
    </Box>
    <Box
      sx={{
        height: '1px',
        width: '100%',
        marginTop: '26px',
        background: '#E4E4E4',
      }}
    ></Box>
    <Typography
      sx={{ margin: '20px 0px' }}
      fontSize={18}
      fontWeight={600}
      color='#11142D'
    >
      Agent Status
    </Typography>
    <Stack
      gap='25px'
      sx={{ display: 'flex', flexWrap: 'wrap' }}
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent='space-around'
    >
      <Box
        sx={{
          flex: '1',
          boxShadow: '0px 15px 30px rgba(160, 158, 158, 0.1)',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #E4E4E4',
        }}
      >
        <PieChart
          title='Total Listings'
          value={35}
          series={[60, 40]}
          colors={['#FE6D8E', '#F2F6FC']}
          location='agents'
        />
      </Box>
      <Box
        sx={{
          flex: '1',
          boxShadow: '0px 15px 30px rgba(160, 158, 158, 0.1)',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #E4E4E4',
        }}
      >
        <PieChart
          title='Properties Sold'
          value={75}
          series={[75, 25]}
          colors={['#2ED480', '#F2F6FC']}
          location='agents'
        />
      </Box>
      <Box
        sx={{
          flex: '1',
          boxShadow: '0px 15px 30px rgba(160, 158, 158, 0.1)',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid #E4E4E4',
        }}
      >
        <PieChart
          title='Properties for Rent'
          value={32}
          series={[75, 25]}
          colors={['#475be8', '#F2F6FC']}
          location='agents'
        />
      </Box>
    </Stack>
  </Box>
);

export { ProfileCard, DetailsCard };
