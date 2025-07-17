import { useChatStore } from '@/app/store/chatStore';

export const typeMessage = async (text) => {
  const store = useChatStore.getState();
  store.setIsTyping(true);
  store.setTypingMessage('');

  let index = 0;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      store.setTypingMessage((prev) => prev + text.charAt(index));
      const current = useChatStore.getState().typingMessage;
      store.setTypingMessage(current + text.charAt(index));

      index++;
      if (index >= text.length) {
        clearInterval(interval);
        store.addMessage({
          type: 'response',
          data: { content: text },
          timestamp: new Date().toISOString(),
        });
        store.clearTyping();
        resolve();
      }
    }, 20);
  });
};
