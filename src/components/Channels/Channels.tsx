import { type FC } from 'react';
import { useFetch } from '../../hooks';

type Props = {};

export const Channels: FC = (props: Props) => {
  const { data, isLoading } = useFetch({ url: '/channels/userChannels' });
  console.log(data);
  return (
    <section>
      {isLoading && <div>LOADING ANIMATION...</div>}
      <ul>
        {data?.map((channel: any) => (
          <li key={channel.id}>{channel.channelName}</li>
        ))}
      </ul>
    </section>
  );
};
