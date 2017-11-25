/* eslint-env jest */

jest.mock('@slack/client')

process.env.MAILGUN_API_KEY = 'mailgun'
process.env.SLACK_WEBHOOK_URL = 'http://www.example.com/callback'

const {
  mailgunCallback: mailgunCallbackFn,
  ping: pingFn
} = require('../handler')
const { calculateSignature } = require('../lib/mailgun')

describe('ping', () => {
  test('return pong', () =>
    pingFn({}, null, (err, response) => {
      expect(err).toBeNull()
      expect(response.statusCode).toEqual(200)
      expect(response.body).toEqual(JSON.stringify({ message: 'pong' }))
    }))
})

describe('callback', () => {
  let timestamp = '9527'
  let token = 'foobar'

  test('returns OK with valid signature', () => {
    let signature = calculateSignature(timestamp, token)
    let event = {
      headers: {
        'content-type':
          'multipart/form-data; boundary=paZqsnEHRufoShdX6fh0lUhXBP4k'
      },
      body: Buffer.from(
        [
          '--paZqsnEHRufoShdX6fh0lUhXBP4k',
          'Content-Disposition: form-data; name="timestamp"',
          '',
          timestamp,
          '--paZqsnEHRufoShdX6fh0lUhXBP4k',
          'Content-Disposition: form-data; name="token"',
          '',
          token,
          '--paZqsnEHRufoShdX6fh0lUhXBP4k',
          'Content-Disposition: form-data; name="signature"',
          '',
          signature,
          '--paZqsnEHRufoShdX6fh0lUhXBP4k--'
        ].join('\r\n')
      )
    }

    return mailgunCallbackFn(event, null, (err, response) => {
      expect(err).toBeNull()
      expect(response.body).toEqual(JSON.stringify({ message: 'OK' }))
      expect(response.statusCode).toEqual(200)
    })
  })

  test('returns error with invalid signature', () => {
    let signature = 'wrong signature'
    let event = {
      headers: {
        'content-type':
          'multipart/form-data; boundary=paZqsnEHRufoShdX6fh0lUhXBP4k'
      },
      body: Buffer.from(
        [
          '--paZqsnEHRufoShdX6fh0lUhXBP4k',
          'Content-Disposition: form-data; name="timestamp"',
          '',
          timestamp,
          '--paZqsnEHRufoShdX6fh0lUhXBP4k',
          'Content-Disposition: form-data; name="token"',
          '',
          token,
          '--paZqsnEHRufoShdX6fh0lUhXBP4k',
          'Content-Disposition: form-data; name="signature"',
          '',
          signature,
          '--paZqsnEHRufoShdX6fh0lUhXBP4k--'
        ].join('\r\n')
      )
    }

    return mailgunCallbackFn(event, null, (err, response) => {
      let message = 'Signature does not match'
      expect(err).toBeNull()
      expect(response.statusCode).toEqual(500)
      expect(response.body).toEqual(JSON.stringify({ error: message }))
    })
  })
})
