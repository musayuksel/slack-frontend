export type TChannels = {
  id: string;
  channelName: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TChannelsProps = {
  setCurrentChannelId: React.Dispatch<React.SetStateAction<string>>;
};
