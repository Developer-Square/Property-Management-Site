import { io, Socket } from "socket.io-client";
import { createCtx } from "utils";

import { serverUrl } from '../constants';

const socket = io(serverUrl);

interface SocketContext {
    socket: Socket;
}

export const [useSocketContext, SocketProvider] = createCtx<SocketContext>();

type Props = {
    children: React.ReactNode;
}

const SocketContextProvider = ({ children }: Props) => {
    return (
        <SocketProvider value={{ socket }}>{children}</SocketProvider>
    );
}

export default SocketContextProvider;