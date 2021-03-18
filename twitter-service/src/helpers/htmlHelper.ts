export const HtmlHelper = {
  generate (tweets: any, email: string): string {
    let html =
      '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Tweets</title></head><body style="font-family: sans-serif">'

    for (const tweet of tweets) {
      const half = `<h1>${tweet.name}</h1><div><h3>${tweet.text}</h3></div><div><a href="${tweet.tweetUrl}" target="_blank">Tweet url</a></div>`

      html += half
    }

    html += `<div style="font-family: 'Josefin Sans', sans-serif"><a href="https://e0v7152962.execute-api.eu-west-1.amazonaws.com/dev/unsubscribe/${email}" target="_blank">Unsubscribe</a></div></body></html>`
    return html
  }
}
