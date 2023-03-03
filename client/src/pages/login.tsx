import { useEffect, useRef, useState } from 'react';
import { useLogin } from '@pankod/refine-core';
import {
  Container,
  Box,
  TextField,
  FormHelperText,
  FormControl,
} from '@pankod/refine-mui';

import { CredentialResponse } from '../interfaces/google';
import { useForm } from '@pankod/refine-react-hook-form';
import { LoginComponent } from 'components';
import SignupComponent from 'components/login-and-signup/SignupComponent';
import { LoginSignup } from 'assets';

export const TextInput = ({
  title,
  type,
  fieldValue,
  register,
  placeholder,
}: {
  title: string;
  type: string;
  fieldValue: string;
  register: any;
  placeholder?: string;
}) => (
  <FormControl
    sx={{
      width: '100%',
    }}
  >
    <FormHelperText
      sx={{
        fontWeight: 500,
        margin: '10px 0',
        fontSize: 16,
        color: '#11142d',
      }}
    >
      {title}
    </FormHelperText>
    <TextField
      type={type}
      required
      id='outlined-basic'
      color='info'
      variant='outlined'
      placeholder={placeholder}
      {...register(fieldValue, { required: true })}
    />
  </FormControl>
);

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();
  const [form, setForm] = useState('login');

  const {
    refineCore: { formLoading },
    register,
    handleSubmit,
  } = useForm();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === 'undefined' || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: 'popup',
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: 'filled_blue',
          size: 'medium',
          type: 'standard',
        });
      } catch (error) {
        console.log(error);
      }
    }, []); // you can also add your client id as dependency here

    return <div ref={divRef} />;
  };

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  return (
    <Box
      component='div'
      sx={{
        background: '#FCFCFC',
        backgroundSize: 'cover',
      }}
    >
      <Box
        component='main'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          padding: { sm: '0px !important' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '85px',
            padding: '0 20px',
          }}
        >
          {form === 'signin' ? (
            <LoginComponent
              GoogleButton={GoogleButton}
              register={register}
              handleSubmit={handleSubmit}
              formLoading={formLoading}
              setForm={setForm}
            />
          ) : (
            <SignupComponent
              GoogleButton={GoogleButton}
              register={register}
              handleSubmit={handleSubmit}
              formLoading={formLoading}
              setForm={setForm}
            />
          )}
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flex: { xs: 1, lg: 2 },
          }}
        >
          <img
            src={LoginSignup}
            style={{
              width: '100%',
              height: '100%',
            }}
            alt='login-signup'
          />
        </Box>
      </Box>
    </Box>
  );
};
