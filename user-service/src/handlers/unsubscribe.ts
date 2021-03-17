import { APIGatewayProxyResult } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { UnsubscribeService } from './services/unsubscribeService'
import validator from '@middy/validator'
import unsubscribeSchema from '../lib/schemas/unsubscribeSchema'
import { DynamoRepository } from '../lib/repositories/implementations/DynamoRepository'

const service = new UnsubscribeService(
  new DynamoRepository()
)

async function unsubscribe (event: any, context: any): Promise<APIGatewayProxyResult> {
  const response = await service.execute(event.body)
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const handler = commonMiddleware(unsubscribe)
  .use(validator({ inputSchema: unsubscribeSchema }))
