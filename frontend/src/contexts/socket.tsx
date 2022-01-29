import { createContext } from "react";
import io, { Socket } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_BASE_URL || "");
export const SocketContext = createContext({} as unknown as Socket);

type props = {
  children: JSX.Element;
};

export function SocketProvider({ children }: props) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
