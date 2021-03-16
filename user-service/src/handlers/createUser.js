/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import commonMiddleware from '../lib/middlewares/commonMiddleware';
import { createUserService } from './services/createUserService';

async function createUser(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from https://codingly.io' }),
  };
}

export const handler = commonMiddleware(createUser);
