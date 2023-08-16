import { type FC } from 'react';
import { useFetch } from '../../hooks';
import { UploadFile } from '../../components/UploadFile';

export const DashboardPage: FC = () => {
  const { data, error, isLoading } = useFetch({ url: '/channels/userChannels' });
  //   console.log({ data, error, isLoading });
  const message = {
    content: 'Hello WMessage 6',
    UserId: 1,
    ChannelId: 1,
  };
  const strMes = JSON.stringify(message);
  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading && <div>LOADING ANIMATION...</div>}
      <UploadFile />
      <ul>
        {data?.map((channel: any) => (
          <li key={channel.id}>{channel.channelName}</li>
          //   <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};
