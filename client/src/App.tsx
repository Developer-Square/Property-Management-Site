import React, { useContext } from 'react';

import { Refine, AuthProvider } from '@pankod/refine-core';
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  ReadyPage,
  ErrorComponent,
} from '@pankod/refine-mui';
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from '@mui/icons-material';

import routerProvider from '@pankod/refine-react-router-v6';
import axios, { AxiosRequestConfig } from 'axios';

import { ColorModeContext } from 'contexts';
import { Title, Sider, Layout, Header } from 'components/layout';
import { parseJwt } from 'utils/parse-jwt';
import { dataProvider } from './rest-data-provider';
import { toast, ToastContainer } from 'react-toastify';

import {
  Login,
  Home,
  Agents,
  MyProfile,
  PropertyDetails,
  AllProperties,
  CreateProperty,
  AgentProfile,
  EditProperty,
  CreateAgent,
} from 'pages';

import 'index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import EditAgent from 'pages/edit-agent';
import Reviews from 'pages/reviews';
import Messages from 'pages/messages';
import VideoCall from 'pages/video-call';
import Api from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';

const axiosInstance = axios.create();
const api = new Api();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

// Refresh the token when it expires so that users don't receive 401 errors
// while they are using the dashboard.
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return new Promise((resolve, reject) => {
      console.log('error', err);
      const originalReq = err.config;
      if (err.response !== undefined) {
        // To stop the refresh token from being sent when logging in
        if (
          api.getRefreshToken() !== null &&
          err.response.status === 401 &&
          err.config
        ) {
          let res = fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/refresh-tokens`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${api.getToken()}`,
              },
              body: JSON.stringify({
                refreshToken: `${api.getRefreshToken()}`,
              }),
            }
          )
            .then((res) => res.json())
            .then((res) => {
              api.storeTokens(res);
              originalReq.headers[
                'Authorization'
              ] = `Bearer ${res.tokens.access.token}`;

              return axios(originalReq);
            });
          resolve(res);
          // If the response is 404 or 400 then just return the error
          // It will be displayed in a pop up notification
        } else if (err.response.status === 404 || err.response.status === 400) {
          reject(err);
        }
      }
      return Promise.reject(err);
    });
  }
);

export interface ILoginCredentials {
  email?: string;
  password?: string;
  credential?: string;
}

function App() {
  const authProvider: AuthProvider = {
    login: async ({ email, password, credential }: ILoginCredentials) => {
      const profileObj = credential ? parseJwt(credential) : null;
      // If the user is logging in with google then send the profile object to the backend
      if (profileObj) {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/google`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
            }),
          }
        );

        const data = await response.json();

        if (response.status === 200) {
          api.storeTokens(data);
        } else {
          return Promise.reject();
        }
      } else {
        // If the user is logging in with email and password then send the email and password to the backend
        api
          .auth()
          .login({ email, password })
          .then((res) => {
            toast('Login successful', { type: 'success' });
            api.storeTokens(res.data);
            return Promise.resolve();
          })
          .catch((err) => {
            toast(err.response.data.message || 'Something went wrong', {
              type: 'error',
            });
            return Promise.reject();
          });
      }

      return Promise.resolve();
    },
    logout: () => {
      const token = localStorage.getItem('accessToken');

      if (token && typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem('accessToken');

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const user = localStorage.getItem('user');
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };
  const { mode } = useContext(ColorModeContext);

  return (
    <>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
      <RefineSnackbarProvider>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme={mode === 'light' ? 'light' : 'dark'}
        />
        <Refine
          dataProvider={dataProvider(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
            axiosInstance
          )}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: 'properties',
              list: AllProperties,
              show: PropertyDetails,
              create: CreateProperty,
              edit: EditProperty,
              icon: <VillaOutlined />,
            },
            {
              name: 'agents',
              list: Agents,
              show: AgentProfile,
              create: CreateAgent,
              edit: EditAgent,
              icon: <PeopleAltOutlined />,
            },
            {
              name: 'reviews',
              list: Reviews,
              icon: <StarOutlineRounded />,
            },
            {
              name: 'messages',
              list: Messages,
              show: VideoCall,
              icon: <ChatBubbleOutline />,
            },
            {
              name: 'my-profile',
              options: { label: 'My Profile' },
              list: MyProfile,
              edit: EditAgent,
              icon: <AccountCircleOutlined />,
            },
          ]}
          Title={Title}
          Sider={Sider}
          Layout={Layout}
          Header={Header}
          routerProvider={routerProvider}
          authProvider={authProvider}
          LoginPage={Login}
          DashboardPage={Home}
        />
      </RefineSnackbarProvider>
    </>
  );
}

export default App;
