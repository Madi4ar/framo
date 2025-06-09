'use client';

import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [serverResponse, setServerResponse] = useState(null);

  const addMessage = (message) => {
    setChatHistory((prev) => {
      if (
        message.type === 'response' &&
        message.data?.id &&
        prev.some(
          (m) => m.type === 'response' && m.data?.id === message.data.id
        )
      ) {
        return prev;
      }

      return [...prev, message];
    });
  };

  const handleServerResponse = (response) => {
    setServerResponse(response);
    addMessage({
      type: 'response',
      data: response,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <ChatContext.Provider
      value={{
        chatHistory,
        addMessage,
        serverResponse,
        setServerResponse: handleServerResponse,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
