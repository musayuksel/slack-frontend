import React, { type FC } from 'react';
import { useFetch } from '../../hooks';
import { MessageInput } from '../MessageInput';
import { TChannelMessages, TChannelMessagesProps } from './ChannelMessages.types';

export const ChannelMessages: FC<TChannelMessagesProps> = ({ currentChannelId }) => {
  const { data, isLoading } = useFetch<TChannelMessages[]>({ url: `/messages/channel/${currentChannelId}` });

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
