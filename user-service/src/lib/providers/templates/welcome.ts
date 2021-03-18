interface welcomeTemplate {
  subject: string
  html: string
}

export function generateWelcomeTemplate (email: string): welcomeTemplate {
  const subject = 'Welcome to Tweets Newsletter!!'
  const html = `<h1 style="font-family: 'Josefin Sans', sans-serif">Be Welcome!!</h1><h3 style="font-family: 'Josefin Sans', sans-serif">You will receive your first news soon!!</h3><div style="font-family: 'Josefin Sans', sans-serif"><a href="https://e0v7152962.execute-api.eu-west-1.amazonaws.com/dev/unsubscribe/${email}" target="_blank">Unsubscribe</a></div>`

  return {
    subject,
    html
  }
}
