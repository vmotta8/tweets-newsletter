import { APIGatewayProxyResult } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { UnsubscribeService } from './services/unsubscribeService'
import { DynamoRepository } from '../lib/repositories/implementations/DynamoRepository'

const service = new UnsubscribeService(
  new DynamoRepository()
)

async function unsubscribe (event: any, context: any): Promise<APIGatewayProxyResult> {
  console.log(event.pathParameters)
  const response = await service.execute(event.pathParameters)
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const handler = commonMiddleware(unsubscribe)
