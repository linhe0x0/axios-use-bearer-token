const axios = require('axios')
const test = require('ava')

const useBearerToken = require('./dist/index.umd')

const mockAdapter = (config) => {
  return new Promise((resolve) => {
    const response = {
      data: config.data,
      status: 200,
      statusText: 'OK',
      headers: config.headers,
      config: config,
      request: null,
    }

    resolve(response)
  })
}

test('should throw an error without bearerToken', async (t) => {
  const request = axios.create({
    adapter: mockAdapter,
  })

  t.throws(
    () => {
      request.interceptors.request.use(useBearerToken())
    },
    {
      message: 'barerToken is required.',
    }
  )
})

test('should request with Authorization when bearerToken is a string', async (t) => {
  const request = axios.create({
    adapter: mockAdapter,
  })

  request.interceptors.request.use(
    useBearerToken({
      bearerToken: 'accessToken',
    })
  )

  const { headers } = await request.get('/')

  t.is(headers.Authorization, 'Bearer accessToken')
})

test('should request without Authorization when bearerToken is empty string', async (t) => {
  const request = axios.create({
    adapter: mockAdapter,
  })

  const bearerToken = () => ''

  request.interceptors.request.use(
    useBearerToken({
      bearerToken,
    })
  )

  const { headers } = await request.get('/')

  t.is(headers.Authorization, undefined)
})

test('should request with Authorization when bearerToken is a Promise', async (t) => {
  const request = axios.create({
    adapter: mockAdapter,
  })

  const bearerToken = () => Promise.resolve('accessToken')

  request.interceptors.request.use(
    useBearerToken({
      bearerToken,
    })
  )

  const { headers } = await request.get('/')

  t.is(headers.Authorization, 'Bearer accessToken')
})
