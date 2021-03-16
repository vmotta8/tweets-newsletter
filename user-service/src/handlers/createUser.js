import commonMiddleware from '../lib/middlewares/commonMiddleware';

async function createUser(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from https://codingly.io' }),
  };
}

export const handler = commonMiddleware(createUser);
