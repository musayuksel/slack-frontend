import { type FC } from 'react';
import { useFetch } from '../../hooks';

type Props = {
  setCurrentChannel: React.Dispatch<React.SetStateAction<string>>;
};

interface IChannels {
  id: string;
  channelName: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Channels: FC<Props> = ({ setCurrentChannel }) => {
  const { data, isLoading } = useFetch({ url: '/channels/userChannels' });

  const channels = data?.map((channel: IChannels) => (
    <li onClick={() => setCurrentChannel(channel.id)} key={channel.id}>
      {channel.channelName}
    </li>
  ));

  return (
    <section>
      {isLoading && <div>LOADING ANIMATION...</div>}
      <ul>{channels}</ul>
    </section>
  );
};
