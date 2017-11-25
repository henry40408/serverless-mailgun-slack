const crypto = require('crypto')

const { MAILGUN_API_KEY } = process.env

function validate (timestamp, token, signature) {
  let hasher = crypto.createHmac('sha256', MAILGUN_API_KEY)
  hasher.update(`${timestamp}${token}`)
  return signature === hasher.digest('hex')
}

exports.validate = validate
