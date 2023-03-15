import { useContext, useEffect, useRef, useState } from 'react';
import { useLogin } from '@pankod/refine-core';
import {
  Box,
  TextField,
  FormHelperText,
  FormControl,
} from '@pankod/refine-mui';

import { CredentialResponse } from '../interfaces/google';
import { LoginComponent } from 'components';
import SignupComponent from 'components/login-and-signup/SignupComponent';
import { LoginSignup } from 'assets';
import { ColorModeContext } from 'contexts';
import Api from 'utils/api';

export const TextInput = ({
  title,
  type,
  fieldValue,
  setFieldValue,
  placeholder,
  mode,
}: {
  title: string;
  type: string;
  fieldValue: string;
  setFieldValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  mode?: string;
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
        color: mode === 'light' ? '#11142d' : '#EFEFEF',
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
      value={fieldValue}
      onChange={(e) => setFieldValue(e.target.value)}
      placeholder={placeholder}
    />
  </FormControl>
);

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();
  const [form, setForm] = useState('signin');
  const [isFormLoading, setIsFormLoading] = useState(false);
  const { mode } = useContext(ColorModeContext);
  const api = new Api();

  const handleSubmit = (data: any) => {
    if (form === 'signin') {
      const { email, password } = data;
      if (email === '' || password === '') {
        // Todo: Add error notification
        console.log('No email or password');
        return;
      }

      setIsFormLoading(true);
      api
        .auth()
        .login(data)
        .then((res) => {
          setIsFormLoading(false);
          api.storeTokens(res.data);
        })
        .catch((err) => {
          setIsFormLoading(false);
          console.log(err);
        });
    } else {
      const { email, name, password, confirmPassword, userImage } = data;
      if (
        email === '' ||
        name === '' ||
        password === '' ||
        confirmPassword === '' ||
        userImage.name === ''
      ) {
        // Todo: Add error notification
        return;
      }

      if (data.password !== data.confirmPassword) {
        // Todo: Add error notification
        return;
      }

      setIsFormLoading(true);
      api
        .auth()
        .registerUser({ ...data, avatar: data.userImage.url })
        .then((res) => {
          setIsFormLoading(false);
          api.storeTokens(res.data);
        })
        .catch((err) => {
          setIsFormLoading(false);
          console.log(err);
        });
    }
  };

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
        background: mode === 'light' ? '#fcfcfc' : '#1A1D1F',
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
              handleSubmit={handleSubmit}
              formLoading={isFormLoading}
              setForm={setForm}
            />
          ) : (
            <SignupComponent
              GoogleButton={GoogleButton}
              handleSubmit={handleSubmit}
              formLoading={isFormLoading}
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
