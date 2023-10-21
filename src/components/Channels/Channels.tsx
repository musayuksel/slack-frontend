import { type FC } from 'react';
import { useFetch } from '../../hooks';
import { TChannels, TChannelsProps } from './Channels.types';

export const Channels: FC<TChannelsProps> = ({ setCurrentChannelId }) => {
  const { data, isLoading } = useFetch<TChannels[]>({ url: '/channels/userChannels' });

  const channels = data?.map((channel) => (
    <li onClick={() => setCurrentChannelId(channel.id)} key={channel.id}>
      {channel.channelName}
    </li>
  ));

  return (
    <section>
      {isLoading && <div>LOADING ANIMATION...</div>}
      <h2>Channels</h2>
      <ul>{channels}</ul>
    </section>
  );
};
