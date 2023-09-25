import { type FC } from 'react';
import { useFetch } from '../../hooks';

export const DashboardPage: FC = () => {
  const { data, isLoading } = useFetch({ url: '/channels/userChannels' });

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading && <div>LOADING ANIMATION...</div>}
      {/* <UploadFile /> */}
      <ul>
        {data?.map((channel: any) => (
          <li key={channel.id}>{channel.channelName}</li>
          //   <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};
