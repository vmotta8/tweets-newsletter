import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { SubscribeService } from './services/subscribeService'
import createError from 'http-errors'

/*
const repository = new Repository()
const service = new Service(
  repository
)
*/
const service = new SubscribeService()

async function subscribe (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  try {
    const response = service.execute(event.body)
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
}

export const handler = commonMiddleware(subscribe)
