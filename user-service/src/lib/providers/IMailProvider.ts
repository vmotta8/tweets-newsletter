export interface IMessage {
  queueURL: string;
  subject: string;
  recipient: string;
  body: string;
}

export interface IMailProvider {
  sendMessage(message: IMessage): Promise<void>;
}
