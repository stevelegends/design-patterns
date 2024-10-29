
interface INotification {
  message: string;
  description: string;
}

interface INotificationBuilder {
  setMessage: (newMessage: string) => INotificationBuilder;
  setDescription: (newDescription: string) => INotificationBuilder;
  build: () => INotification;
}

const NotificationBuilder = (): INotificationBuilder => {
  let message: string;
  let description: string;

  const setMessage = (newMessage: string) => {
    message = newMessage;
    return builder;
  };

  const setDescription = (newDescription: string) => {
    description = newDescription;
    return builder;
  };

  const build = (): INotification => {
    return { message, description };
  };

  const builder: INotificationBuilder = {
    setMessage,
    setDescription,
    build,
  };

  return builder;
};

const notification = NotificationBuilder()
  .setMessage('test')
  .setDescription('description')
  .build();
console.log(notification);
