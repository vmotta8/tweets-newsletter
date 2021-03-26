import { APIGatewayProxyResult } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { SendService } from './services/sendService'
import { SESMailProvider } from '../lib/providers/implementations/SESMailProvider'
import { users } from '../helpers/TwitterUsers'
import { RedisProvider } from '../lib/providers/implementations/RedisProvider'

const service = new SendService(
  new SESMailProvider(),
  new RedisProvider()
)

async function send (event: any, context: any): Promise<APIGatewayProxyResult> {
  const response = await service.execute(event.pathParameters, users)
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const handler = commonMiddleware(send)
