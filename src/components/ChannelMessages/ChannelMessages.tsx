import React, { type FC } from 'react';
import { useFetch } from '../../hooks';

type Props = {
  currentChannel: string;
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

export const ChannelMessages: FC<Props> = ({ currentChannel }) => {
  const { data, isLoading } = useFetch({ url: `/messages/channel/${currentChannel}` });

  console.log({ data, isLoading });

  const messages = data?.map((message: IChannelMessages) => (
    <li key={message.id}>
      {message.content}- from: {message.userId}
    </li>
  ));

  return (
    <section>
      {isLoading && <div>LOADING ANIMATION...</div>}
      <ul>{messages}</ul>
    </section>
  );
};
