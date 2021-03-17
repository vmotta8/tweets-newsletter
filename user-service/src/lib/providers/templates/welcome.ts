interface welcomeTemplate {
  subject: string
  html: string
}

export function generateWelcomeTemplate (): welcomeTemplate {
  const subject = 'Obrigado por se inscrever!!'
  const html = '<h1 style="font-family: \'Josefin Sans\', sans-serif">Seja Bem Vindo!</h1><h3 style="font-family: \'Josefin Sans\', sans-serif">Receberá suas primeiras notícias em breve!</h3>'

  return {
    subject,
    html
  }
}
