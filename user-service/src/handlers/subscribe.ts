import { APIGatewayProxyResult } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { SubscribeService } from './services/subscribeService'
import { SESMailProvider } from '../lib/providers/implementations/SESMailProvider'
import { DynamoRepository } from '../lib/repositories/implementations/DynamoRepository'

const service = new SubscribeService(
  new SESMailProvider(),
  new DynamoRepository()
)

async function subscribe (event: any, context: any): Promise<APIGatewayProxyResult> {
  const response = await service.execute(event.pathParameters)
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const handler = commonMiddleware(subscribe)
