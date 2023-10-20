import React, { type FC } from 'react';
import { useFetch } from '../../hooks';
import { MessageInput } from '../MessageInput';

type Props = {
  currentChannelId: string;
};
interface IChannelMessages {
  id: string;
  content: string;
  attachment: string | null;
  createdAt: Date;
  updatedAt: Date;
  channelId: string;
  userId: string;
}

export const ChannelMessages: FC<Props> = ({ currentChannelId }) => {
  const { data, isLoading } = useFetch<IChannelMessages[]>({ url: `/messages/channel/${currentChannelId}` });

  console.log({ data, isLoading });

  const messages = data?.map((message) => (
    <li key={message.id}>
      {message.content}- from: {message.userId}
    </li>
  ));

  return (
    <section>
      {isLoading && <div>LOADING ANIMATION...</div>}
      <h2>Messages</h2>
      <ul>{messages}</ul>
      <MessageInput currentChannelId={currentChannelId} />
    </section>
  );
};
