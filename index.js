export default function bearerToken(options = {}) {
  const { bearerToken } = options

  if (!bearerToken) {
    throw Error('barerToken is required.')
  }

  return async function interceptor(config) {
    let accessToken = ''

    if (typeof bearerToken === 'string') {
      accessToken = bearerToken
    } else {
      accessToken = await getAccessToken()
    }

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  }
}
