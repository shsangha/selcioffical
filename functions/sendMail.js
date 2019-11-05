require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const mailgun = require("mailgun-js")

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
})

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

const handler = (event, _, callback) => {
  const data = JSON.parse(event.body)

  const { name, email, subject, message } = data

  const mailOptions = {
    from: `${name} <${email}>`,
    to: "shawnsangha9@gmail.com",
    replyTo: email,
    subject: `${subject}`,
    text: `${message}`,
  }

  if (!name || !email || !subject || !message) {
    callback(null, {
      statusCode: 422,
      headers,
      body: JSON.stringify({ error: "Invalid form data" }),
    })
  }

  mg.messages().send(mailOptions, (error, body) => {
    if (error) {
      callback(null, {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Error with mail service try again later",
        }),
      })
    } else {
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(body),
      })
    }
  })
}

exports.handler = handler
