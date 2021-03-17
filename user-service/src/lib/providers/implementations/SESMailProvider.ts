import { IMailProvider, IMessage } from '../IMailProvider'
import createError from 'http-errors'
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
    }, function (err, data) {
      if (err) {
        console.log('Error', err)
        throw new createError.NotAcceptable('Invalid queue url.')
      } else {
        console.log('Success', data.MessageId)
      }
    })
  }
}
