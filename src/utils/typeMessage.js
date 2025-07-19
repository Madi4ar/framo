import { useChatStore } from '@/app/store/chatStore';

export const typeMessage = async (text) => {
  const store = useChatStore.getState();
  store.setIsTyping(true);
  store.setTypingMessage('');

  await new Promise((r) => setTimeout(r, 500));

  let index = 0;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
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
