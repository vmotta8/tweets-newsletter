import { User } from '../../../entities/User'
import { IRepository } from '../IRepository'
import createError from 'http-errors'
import AWS from 'aws-sdk'
import { ItemList } from 'aws-sdk/clients/dynamodb'

const dynamodb = new AWS.DynamoDB.DocumentClient()

export class DynamoRepository implements IRepository {
  async findByEmail (email: string): Promise<boolean | ItemList> {
    try {
      const user = await dynamodb.query({
        TableName: process.env.USERS_TABLE_NAME || '',
        IndexName: 'Email',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email
        }
      }).promise()

      if (!user.Items) {
        return false
      }

      return user.Items
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
