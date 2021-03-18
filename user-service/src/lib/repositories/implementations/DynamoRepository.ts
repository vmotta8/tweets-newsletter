import { User } from '../../../entities/User'
import { IRepository } from '../IRepository'
import createError from 'http-errors'
import AWS from 'aws-sdk'

const dynamodb = new AWS.DynamoDB.DocumentClient()

export class DynamoRepository implements IRepository {
  async changeStatus (id: string, status: string): Promise<any> {
    try {
      const result = await dynamodb.update({
        TableName: process.env.USERS_TABLE_NAME || '',
        Key: { id },
        UpdateExpression: 'set #status = :status',
        ExpressionAttributeValues: {
          ':status': status
        },
        ExpressionAttributeNames: {
          '#status': 'status'
        },
        ReturnValues: 'ALL_NEW'
      }).promise()

      return result.Attributes
    } catch (err) {
      console.log('Error', err)
      throw new createError.InternalServerError(err)
    }
  }

  async findAll (): Promise<any> {
    const status = 'ACTIVE'

    try {
      const users = await dynamodb.query({
        TableName: process.env.USERS_TABLE_NAME || '',
        IndexName: 'Status',
        KeyConditionExpression: '#status = :status',
        ExpressionAttributeValues: {
          ':status': status
        },
        ExpressionAttributeNames: {
          '#status': 'status'
        }
      }).promise()

      if (!users.Items) {
        console.log(users)
        throw new createError.BadRequest('Error on finding users.')
      }

      return users.Items
    } catch (err) {
      console.log('Error', err)
      throw new createError.InternalServerError(err)
    }
  }

  async findByEmail (email: string): Promise<false | any> {
    try {
      const user = await dynamodb.query({
        TableName: process.env.USERS_TABLE_NAME || '',
        IndexName: 'Email',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email
        }
      }).promise()

      if (!user.Items || user.Items.length === 0) {
        return false
      }

      return user.Items[0]
    } catch (err) {
      console.log('Error', err)
      throw new createError.InternalServerError(err)
    }
  }

  async save (user: User): Promise<void> {
    try {
      await dynamodb.put({
        TableName: process.env.USERS_TABLE_NAME || '',
        Item: user
      }).promise()
    } catch (err) {
      console.log('Error', err)
      throw new createError.InternalServerError(err)
    }
  }
}
