/* eslint @typescript-eslint/no-explicit-any: "off" */
import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "../contexts/socket";

export default function useSocketHandlers<
  Handlers extends { [Key: string]: (...args: any[]) => void },
>(handlers: Handlers) {
  const socket = useContext(SocketContext);
  const deps = useRef({
    socket,
    handlers,
  }).current;

  useEffect(() => {
    const handlersEntries = Object.entries(deps.handlers);

    handlersEntries.forEach(([name, handler]) => {
      deps.socket.on(name, handler);
    });

    return () => {
      handlersEntries.forEach(([name, handler]) => {
        // eslint-disable-next-line
        deps.socket.off(name, handler);
      });
    };
  }, [deps]);
}
