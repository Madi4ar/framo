'use client';
import { create } from 'zustand';

export const useChatStore = create((set, get) => ({
  chatHistory: [],
  serverResponse: null,
  typingMessage: '',
  isTyping: false,
  inviteCode: '',
  isWaitingForResponse: false,

  setInviteCode: (code) => set({ inviteCode: code }),

  addMessage: (message) => {
    const existing = get().chatHistory;

    if (
      message.type === 'response' &&
      message.data?.id &&
      existing.some(
        (m) => m.type === 'response' && m.data?.id === message.data.id
      )
    ) {
      return;
    }

    set({ chatHistory: [...existing, message] });
  },

  setServerResponse: (response) => {
    set({ serverResponse: response });

    get().addMessage({
      type: 'response',
      data: response,
      timestamp: new Date().toISOString(),
    });
  },

  setTypingMessage: (message) => set({ typingMessage: message }),
  clearTyping: () => set({ typingMessage: '', isTyping: false }),
  setIsTyping: (flag) => set({ isTyping: flag }),
  setWaitingForResponse: (flag) => {
    console.log('setWaitingForResponse called with:', flag);
    set({ isWaitingForResponse: flag });
  },
}));
