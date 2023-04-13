import { io } from "socket.io-client";

import { serverUrl } from '../constants';

const socket = io(serverUrl, { auth: { token: localStorage.getItem('accessToken') } });

export default socket;