interface Notification {
  title: string;
  message: string;
}

interface Notify {
  sendMessage: (payload: Notification) => void;
}

const SMS: Notify = {
  sendMessage(payload) {
    console.log('Sending SMS message', payload);
  },
};

const Firebase: Notify = {
  sendMessage(payload) {
    console.log('Sending firebase message', payload);
  },
};

// for example extend a new service
const AWS: Notify = {
  sendMessage(payload) {
    console.log('Sending AWS message', payload);
  },
};

const MessageStrategy = () => {
  let context: Notify;
  return {
    setContext: (notify: Notify) => {
      context = notify;
    },
    executeSendMessage: (payload: Notification) => {
      context.sendMessage(payload);
    },
  };
};

function runTime() {
  const payload: Notification = {
    title: 'Broadcast',
    message: 'Message from system ...',
  };

  const message = MessageStrategy();
  message.setContext(SMS);
  message.executeSendMessage(payload);

  message.setContext(Firebase);
  message.executeSendMessage(payload);

  // extend a new service
  message.setContext(AWS);
  message.executeSendMessage(payload);
}

runTime();
