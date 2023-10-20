import { useState, type FC } from 'react';
import { ChannelMessages, Channels } from '../../components';

export const DashboardPage: FC = () => {
  const [currentChannelId, setCurrentChannelId] = useState('');

  console.log({ currentChannelId });
  return (
    <div>
      <h1>Dashboard</h1>
      <Channels setCurrentChannelId={setCurrentChannelId} />
      <ChannelMessages currentChannelId={currentChannelId} />
    </div>
  );
};
