import React, { useState } from "react";
import { createContext, useContext } from "react";
import { Alert, Snackbar } from "@mui/material";

type MessgeLevel = "warning" | "error";

export interface Message {
  text: string;
  level: MessgeLevel;
}

export interface MessageContext {
  setMessage: (message: Message) => void;
}

const MessageContext = createContext<MessageContext>({
  setMessage: () => {},
});

export const useMessageContext = () => useContext(MessageContext);

export interface MessageContextProviderProps {
  children: React.ReactNode;
}

export const MessageContextProvider = ({
  children,
}: MessageContextProviderProps) => {
  const [text, setText] = useState<string | null>(null);
  const [level, setLevel] = useState<MessgeLevel>("warning");

  const setMessage = ({ text, level }: Message) => {
    // Values are stored separately to fix a glitch of the Snackbar component
    setText(text);
    setLevel(level);
  };

  return (
    <MessageContext.Provider value={{ setMessage }}>
      <Snackbar
        open={text !== null}
        autoHideDuration={8000}
        onClose={() => setText(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setText(null)}
          severity={level}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {text}
        </Alert>
      </Snackbar>
      {children}
    </MessageContext.Provider>
  );
};
