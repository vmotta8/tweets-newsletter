import { APIGatewayProxyResult } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { SendAllService } from './services/sendAllService'
import { SESMailProvider } from '../lib/providers/implementations/SESMailProvider'
import { users } from '../helpers/TwitterUsers'

const service = new SendAllService(
  new SESMailProvider()
)

async function sendAll (event: any, context: any): Promise<APIGatewayProxyResult> {
  const response = await service.execute(users)
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const handler = commonMiddleware(sendAll)
