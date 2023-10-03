import { useState, type FC } from 'react';
import { ChannelMessages, Channels } from '../../components';

export const DashboardPage: FC = () => {
  const [currentChannel, setCurrentChannel] = useState('');

  console.log({ currentChannel });
  return (
    <div>
      <h1>Dashboard</h1>
      <Channels setCurrentChannel={setCurrentChannel} />
      <ChannelMessages currentChannel={currentChannel} />
    </div>
  );
};
