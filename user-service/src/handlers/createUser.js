/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

async function createUser(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from https://codingly.io' }),
  };
}

export const handler = createUser;
