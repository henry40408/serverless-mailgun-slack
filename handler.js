'use strict'

const { validate } = require('./lib/mailgun')
const { sendSlackNotificaionAsync } = require('./lib/slack')
const { parseFieldsAsync } = require('./lib/multipart')

function ping (event, context, callback) {
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: 'pong' })
  })
}

exports.ping = ping

function mailgunCallback (event, context, callback) {
  return parseFieldsAsync(event)
    .then(fields => {
      let { timestamp, token, signature } = fields
      if (validate(timestamp, token, signature)) {
        return fields
      }
      throw new Error('Signature does not match')
    })
    .then(fields => sendSlackNotificaionAsync(fields))
    .then(() =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: 'OK' })
      })
    )
    .catch(error =>
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ error: error.message })
      })
    )
}

exports.mailgunCallback = mailgunCallback
