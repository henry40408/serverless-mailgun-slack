const { IncomingWebhook } = require('@slack/client')

const { SLACK_WEBHOOK_URL } = process.env

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL)

function sendSlackNotificaionAsync (payload) {
  let { 'body-plain': bodyPlain, recipient, sender, subject } = payload

  let fields = [
    {
      title: 'Sender',
      value: sender,
      short: true
    },
    {
      title: 'Recipient',
      value: recipient,
      short: true
    }
  ]

  let attachments = [
    {
      color: 'good',
      fallback: bodyPlain,
      fields,
      text: bodyPlain,
      title: subject
    }
  ]

  return webhook.send({ attachments })
}

exports.sendSlackNotificaionAsync = sendSlackNotificaionAsync
