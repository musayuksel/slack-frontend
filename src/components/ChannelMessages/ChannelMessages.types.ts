export type TChannelMessages = {
  id: string;
  content: string;
  attachment: string | null;
  createdAt: Date;
  updatedAt: Date;
  channelId: string;
  userId: string;
};

export type TChannelMessagesProps = {
  currentChannelId: string;
};
