import { useEffect, type FC } from 'react';
import { useFetch } from '../../hooks';
import { TChannels, TChannelsProps } from './Channels.types';
import styles from './Channels.module.css';

export const Channels: FC<TChannelsProps> = ({ setCurrentChannelId }) => {
  const { data, isLoading } = useFetch<TChannels[]>({ url: '/channels/userChannels' });

  useEffect(() => {
    data && data.length > 0 && setCurrentChannelId(data[0].id);
  }, [data, setCurrentChannelId]); // Set the first channel as the initial channel

  const channels = data?.map((channel) => (
    <li onClick={() => setCurrentChannelId(channel.id)} key={channel.id}>
      {channel.channelName}
    </li>
  ));

  return (
    <section className={styles.channelsSection}>
      {isLoading && <div>LOADING ANIMATION...</div>}
      <h2>Channels</h2>
      <ul className={styles.channelsContainer}>{channels}</ul>
    </section>
  );
};
