import { APIGatewayProxyResult } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { SendAllService } from './services/sendAllService'
import { SESMailProvider } from '../lib/providers/implementations/SESMailProvider'
import { users } from '../helpers/TwitterUsers'

const service = new SendAllService(
  new SESMailProvider()
)

async function sendAll (event: any, context: any): Promise<APIGatewayProxyResult> {
  service.execute(users)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'All news was sent successfully!' })
  }
}

export const handler = commonMiddleware(sendAll)
