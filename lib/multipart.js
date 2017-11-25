const Busboy = require('busboy')

function parseFieldsAsync (event) {
  let { body, isBase64Encoded } = event

  let headers = {}
  Object.keys(event.headers).forEach(key => {
    headers[key.toLowerCase()] = event.headers[key]
  })

  let busboy = new Busboy({ headers })
  let fields = {}

  return new Promise((resolve, reject) => {
    busboy.on('error', err => reject(err))
    busboy.on('finish', () => resolve(fields))

    busboy.on('field', (name, value) => {
      fields[name] = value
    })

    let encoding = 'binary'
    if (isBase64Encoded) {
      encoding = 'base64'
    }

    busboy.write(body, encoding)
    return busboy.end()
  })
}

exports.parseFieldsAsync = parseFieldsAsync
