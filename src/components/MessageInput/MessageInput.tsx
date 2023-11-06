import React, { useState, type FC, useContext } from 'react';
import { HttpMethod, fetchData } from '../../utils';
import { UserContext } from '../../contexts';

type Props = {
  currentChannelId: string;
};

export const MessageInput: FC<Props> = ({ currentChannelId }) => {
  const [message, setMessage] = useState('');

  const { user } = useContext(UserContext);

  const sendMessageToChannel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messagePayload = {
      content: message,
      userId: user?.id,
      channelId: currentChannelId,
      attachment: null,
    };
    try {
      const response = await fetchData({
        url: '/messages',
        method: HttpMethod.POST,
        body: JSON.stringify(messagePayload),
      });

      const newMessage = await response.json(); //TODO: add message to state
      console.log({ newMessage });
      setMessage('');
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <form onSubmit={sendMessageToChannel}>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
    </form>
  );
};
