export default function useBearerToken(options = {}) {
  const { bearerToken } = options

  if (!bearerToken) {
    throw Error('barerToken is required.')
  }

  return async function interceptor(config) {
    let accessToken = ''

    if (typeof bearerToken === 'string') {
      accessToken = bearerToken
    } else {
      accessToken = await bearerToken()
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  }
}
