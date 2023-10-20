import { type FC } from 'react';
import { useFetch } from '../../hooks';

type Props = {
  setCurrentChannelId: React.Dispatch<React.SetStateAction<string>>;
};

interface IChannels {
  id: string;
  channelName: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Channels: FC<Props> = ({ setCurrentChannelId }) => {
  const { data, isLoading } = useFetch<IChannels[]>({ url: '/channels/userChannels' });

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
