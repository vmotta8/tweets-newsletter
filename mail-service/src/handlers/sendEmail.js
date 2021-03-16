import AWS from 'aws-sdk'

const ses = new AWS.SES({ region: 'us-east-1' })

async function sendMail(event, context) {
  const record = event.Records[0]

  const email = JSON.parse(record.body)
  const { subject, body, recipient } = email

  const params = {
    Source: 'Vinicius <viniciusmotta8@gmail.com>',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
    },
  }

  try {
    const result = await ses.sendEmail(params).promise()
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}

export const handler = sendMail