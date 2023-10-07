import { useState, createContext, useContext, useMemo } from "react";
import useSocketHandlers from "../hooks/use-socket-handlers";
import { SocketContext } from "./socket";

type PromptContext = {
  startInboxPrompt: (broadcast: rawBroadcast) => void;
  endInboxPrompt: () => void;
  currentBroadcast: rawBroadcast | null;
  getCurrentPrompt: () => void;
};
export const promptContext = createContext<PromptContext>({} as PromptContext);

type props = {
  children: JSX.Element;
};

export function PromptProvider({ children }: props) {
  const [currentBroadcast, setCurrentBroadcast] = useState<rawBroadcast | null>(
    null,
  );
  const socket = useContext(SocketContext);

  useSocketHandlers({
    "new-inbox-prompt": (broadcast: rawBroadcast) =>
      setCurrentBroadcast(broadcast),
    "end-inbox-prompt": () => setCurrentBroadcast(null),
  });

  const providerValue = useMemo(() => {
    const startInboxPrompt = (broadcast: rawBroadcast) => {
      socket.emit("start-inbox-prompt", broadcast);
    };
    const endInboxPrompt = () => {
      socket.emit("end-inbox-prompt");
    };
    const getCurrentPrompt = () => {
      socket.emit("get-inbox-prompt");
    };

    return {
      startInboxPrompt,
      endInboxPrompt,
      currentBroadcast,
      getCurrentPrompt,
    };
  }, [currentBroadcast, socket]);

  return (
    <promptContext.Provider value={providerValue}>
      {children}
    </promptContext.Provider>
  );
}
