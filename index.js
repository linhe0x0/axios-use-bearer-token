export default (options = {}) => {
  const { getAccessToken } = options

  if (!getAccessToken) {
    throw Error('getAccessToken function is required.')
  }

  return (config) => {
    const accessToken = getAccessToken()

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  }
}
