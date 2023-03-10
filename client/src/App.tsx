import React from 'react';

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

import dataProvider from '@pankod/refine-simple-rest';
import routerProvider from '@pankod/refine-react-router-v6';
import axios, { AxiosRequestConfig } from 'axios';

import { ColorModeContextProvider } from 'contexts';
import { Title, Sider, Layout, Header } from 'components/layout';
import { CredentialResponse } from 'interfaces/google';
import { parseJwt } from 'utils/parse-jwt';

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

const axiosInstance = axios.create();
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

function App() {
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

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
          localStorage.setItem('accessToken', data.tokens.access.token);
          localStorage.setItem('accessTokenExpires', data.tokens.access.expires);
          localStorage.setItem('refreshToken', data.tokens.refresh.token);
          localStorage.setItem('user', JSON.stringify({ ...data.user, userid: data.user._id }));
        } else {
          return Promise.reject();
        }
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

      if (token){
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

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1`
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
    </ColorModeContextProvider>
  );
}

export default App;
