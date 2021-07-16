export default function bearerToken(options = {}) {
  const { getAccessToken } = options

  if (!getAccessToken) {
    throw Error('getAccessToken function is required.')
  }

  return async function interceptor(config) {
    const accessToken = await getAccessToken()

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  }
}
