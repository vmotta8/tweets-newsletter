import { APIGatewayProxyResult } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { SubscribeService } from './services/subscribeService'
import validator from '@middy/validator'
import subscribeSchema from '../lib/schemas/subscribeSchema'

/*
const repository = new Repository()
const service = new Service(
  repository
)
*/
const service = new SubscribeService()

async function subscribe (event: any, context: any): Promise<APIGatewayProxyResult> {
  const response = service.execute(event.body)
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const handler = commonMiddleware(subscribe)
  .use(validator({ inputSchema: subscribeSchema }))
