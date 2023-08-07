import { useState, createContext, useContext } from 'react';
import useSocketHandlers from '../hooks/use-socket-handlers';
import { SocketContext } from './socket';

type promptContext = {
  startInboxPrompt: (broadcast: rawBroadcast) => void;
  endInboxPrompt: () => void;
  currentBroadcast: rawBroadcast | null;
  getCurrentPrompt: () => void;
};
export const promptContext = createContext<promptContext>({} as promptContext);

type props = {
  children: JSX.Element;
};

export function PromptProvider({ children }: props) {
  const [currentBroadcast, setCurrentBroadcast] = useState<rawBroadcast | null>(
    null,
  );
  const socket = useContext(SocketContext);

  useSocketHandlers({
    'new-inbox-prompt': (broadcast: rawBroadcast) => setCurrentBroadcast(broadcast),
    'end-inbox-prompt': () => setCurrentBroadcast(null),
  });

  const startInboxPrompt = (broadcast: rawBroadcast) => {
    socket.emit('start-inbox-prompt', broadcast);
  };
  const endInboxPrompt = () => {
    socket.emit('end-inbox-prompt');
  };
  const getCurrentPrompt = () => {
    socket.emit('get-inbox-prompt');
  };

  return (
    <promptContext.Provider
      value={{
        startInboxPrompt,
        endInboxPrompt,
        currentBroadcast,
        getCurrentPrompt,
      }}
    >
      {children}
    </promptContext.Provider>
  );
}
