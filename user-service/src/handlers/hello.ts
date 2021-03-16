import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { HelloService } from './services/helloService'
import createError from 'http-errors'

/*
const repository = new Repository()
const service = new HelloService(
  repository
)
*/
const helloService = new HelloService()

async function hello (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  try {
    const hello = helloService.execute()
    return {
      statusCode: 200,
      body: JSON.stringify({ message: hello })
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
}

export const handler = commonMiddleware(hello)
