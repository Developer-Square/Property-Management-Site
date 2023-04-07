import React, { SetStateAction, useContext, useState } from 'react';
import { Typography, Box, Button } from '@pankod/refine-mui';
import CustomButton from 'components/common/CustomButton';
import { DarkLogo, LightLogo } from 'assets';
import { TextInput } from 'pages/login';
import { ColorModeContext } from 'contexts';
import { toast } from 'react-toastify';

const SignupComponent = ({
  GoogleButton,
  handleSubmit,
  formLoading,
  setForm,
}: {
  GoogleButton: any;
  handleSubmit: any;
  formLoading: boolean;
  setForm: React.Dispatch<SetStateAction<string>>;
}) => {
  const { mode } = useContext(ColorModeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userImage, setUserImage] = useState<{ name: string; url: string }>({
    name: '',
    url: '',
  });

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) => {
      if (file?.size / 1000000 > 3) {
        toast('File size should be less than 3MB', {
          type: 'error',
        });
        return;
      }
      setUserImage({ name: file?.name, url: result });
    });
  };

  const handleFormChange = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setUserImage({ name: '', url: '' });
    setForm('signin');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: { lg: '362px' },
        marginBottom: '85px',
      }}
    >
      <Typography
        fontSize={37}
        fontWeight={700}
        color={mode === 'light' ? '#11142d' : '#EFEFEF'}
      >
        Hi! Welcome
      </Typography>
      <Typography fontSize={16} color='#808191'>
        Sign up for our site and make your life easier
      </Typography>
      <img
        src={mode === 'light' ? DarkLogo : LightLogo}
        style={{
          display: 'block',
          height: '70px',
          margin: '40px 0',
          width: '70px',
          borderRadius: '50%',
        }}
        alt='Techive Logo'
      />
      <form>
        <TextInput
          title={'Username'}
          fieldValue={name}
          setFieldValue={setName}
          placeholder='Enter your username'
          type='text'
          mode={mode}
          active={formLoading}
        />
        <TextInput
          title={'Email'}
          fieldValue={email}
          setFieldValue={setEmail}
          placeholder='Enter your email'
          type='text'
          mode={mode}
          active={formLoading}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            color={mode === 'light' ? '#11142d' : '#EFEFEF'}
            fontSize={16}
            fontWeight={500}
            my='20px'
          >
            Upload your avatar *
          </Typography>

          <Typography
            fontSize={14}
            color='#808191'
            sx={{ wordBreak: 'break-all' }}
          >
            {userImage?.name}
          </Typography>

          <Button
            component='label'
            sx={{
              width: 'fit-content',
              color: '#2ed480',
              textTransform: 'capitalize',
              fontSize: 16,
            }}
          >
            Upload *
            <input
              hidden
              accept='image/*'
              type='file'
              onChange={(e) => {
                // @ts-ignore
                handleImageChange(e.target.files[0]);
              }}
            />
          </Button>
        </Box>
        <TextInput
          title={'Password'}
          fieldValue={password}
          setFieldValue={setPassword}
          placeholder='********'
          type='password'
          mode={mode}
          active={formLoading}
        />
        <TextInput
          title={'Confirm Password'}
          fieldValue={confirmPassword}
          setFieldValue={setConfirmPassword}
          placeholder='********'
          type='password'
          mode={mode}
          active={formLoading}
        />
      </form>
      <Box marginBottom='20px'></Box>
      <CustomButton
        fullWidth
        title={formLoading ? 'Loading...' : 'Sign up'}
        backgroundColor='#475BE8'
        color='#fcfcfc'
        active={formLoading}
        handleClick={() =>
          handleSubmit({
            email,
            password,
            confirmPassword,
            name,
            userImage,
          })
        }
      />
      <Typography
        fontSize={16}
        sx={{
          margin: '15px 0',
        }}
      >
        or
      </Typography>
      <Box>
        <GoogleButton />
      </Box>
      <Typography
        fontSize={15}
        sx={{
          marginTop: '15px',
          marginBottom: '85px',
          color: '#808191',
        }}
      >
        Already have an account?{' '}
        <span
          style={{ color: '#475BE8', cursor: 'pointer' }}
          onClick={() => handleFormChange()}
        >
          Sign in
        </span>
      </Typography>
    </Box>
  );
};

export default SignupComponent;
