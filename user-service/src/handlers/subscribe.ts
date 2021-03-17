import { APIGatewayProxyResult } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { SubscribeService } from './services/subscribeService'
import validator from '@middy/validator'
import subscribeSchema from '../lib/schemas/subscribeSchema'
import { SESMailProvider } from '../lib/providers/implementations/SESMailProvider'
import { DynamoRepository } from '../lib/repositories/implementations/DynamoRepository'

const service = new SubscribeService(
  new SESMailProvider(),
  new DynamoRepository()
)

async function subscribe (event: any, context: any): Promise<APIGatewayProxyResult> {
  const response = service.execute(event.body)
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const handler = commonMiddleware(subscribe)
  .use(validator({ inputSchema: subscribeSchema }))
