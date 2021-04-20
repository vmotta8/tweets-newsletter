import { APIGatewayProxyResult } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { ActiveService } from './services/activeService'
import { DynamoRepository } from '../lib/repositories/implementations/DynamoRepository'

const service = new ActiveService(
  new DynamoRepository()
)

async function active (event: any, context: any): Promise<APIGatewayProxyResult> {
  const response = await service.execute()
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const handler = commonMiddleware(active)
