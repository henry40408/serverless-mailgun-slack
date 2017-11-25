const crypto = require('crypto')

const { MAILGUN_API_KEY } = process.env

function calculateSignature (timestamp, token) {
  let hasher = crypto.createHmac('sha256', MAILGUN_API_KEY)
  hasher.update(`${timestamp}${token}`)
  return hasher.digest('hex')
}

exports.calculateSignature = calculateSignature

function validate (timestamp, token, signature) {
  return signature === calculateSignature(timestamp, token)
}

exports.validate = validate
