import { IMailProvider, IMessage } from '../IMailProvider'
import AWS from 'aws-sdk'

const sqs = new AWS.SQS()

export class SESMailProvider implements IMailProvider {
  async sendMessage (message: IMessage): Promise<void> {
    sqs.sendMessage({
      QueueUrl: message.queueURL,
      MessageBody: JSON.stringify({
        subject: message.subject,
        recipient: message.recipient,
        body: message.body
      })
    }).promise()
  }
}
