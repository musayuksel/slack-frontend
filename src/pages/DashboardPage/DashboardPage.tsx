import { useState, type FC } from 'react';
import { ChannelMessages, Channels } from '../../components';
import styles from './DashboardPage.module.css';

export const DashboardPage: FC = () => {
  const [currentChannelId, setCurrentChannelId] = useState('');

  return (
    <>
      <h1>Dashboard</h1>
      <div className={styles.channelMessageSectionContainer}>
        <Channels setCurrentChannelId={setCurrentChannelId} />
        <ChannelMessages currentChannelId={currentChannelId} />
      </div>
    </>
  );
};
