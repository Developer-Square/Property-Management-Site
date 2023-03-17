import { useContext, useEffect, useRef, useState } from 'react';
import { useLogin } from '@pankod/refine-core';
import {
  Box,
  TextField,
  FormHelperText,
  FormControl,
} from '@pankod/refine-mui';
import { toast } from 'react-toastify';

import { CredentialResponse } from '../interfaces/google';
import { LoginComponent } from 'components';
import SignupComponent from 'components/login-and-signup/SignupComponent';
import { LoginSignup } from 'assets';
import { ColorModeContext } from 'contexts';
import Api from 'utils/api';
import { useNavigate } from '@pankod/refine-react-router-v6';

export const TextInput = ({
  title,
  type,
  fieldValue,
  setFieldValue,
  placeholder,
  mode,
  active,
}: {
  title: string;
  type: string;
  fieldValue: string;
  setFieldValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  mode?: string;
  active: boolean;
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
      disabled={active}
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
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    if (form === 'signin') {
      const { email, password } = data;
      if (email === '' || password === '') {
        toast('Please enter email and password', { type: 'error' });
        return;
      }

      setIsFormLoading(true);
      api
        .auth()
        .login(data)
        .then((res) => {
          setIsFormLoading(false);
          toast('Login successful', { type: 'success' });
          api.storeTokens(res.data);
          navigate('/dashboard');
        })
        .catch((err) => {
          setIsFormLoading(false);
          toast(err.response.data.message || 'Something went wrong', {
            type: 'error',
          });
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
        toast('Please fill all fields', { type: 'error' });
        return;
      }

      if (data.password !== data.confirmPassword) {
        toast('Passwords do not match', { type: 'error' });
        return;
      }

      setIsFormLoading(true);
      api
        .auth()
        .registerUser({ ...data, avatar: data.userImage.url })
        .then((res) => {
          setIsFormLoading(false);
          toast('Account created successfully', { type: 'success' });
          api.storeTokens(res.data);
          setForm('signin');
        })
        .catch((err) => {
          setIsFormLoading(false);
          toast(err.response.data.message || 'Something went wrong', {
            type: 'error',
          });
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
