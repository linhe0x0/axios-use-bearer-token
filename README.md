# axios-use-bearer-token

A Bearer token interceptor for axios.

## Install

```bash
yarn add @sqrtthree/axios-use-bearer-token

# OR use npm:
npm install @sqrtthree/axios-use-bearer-token
```

## How to use

```ts
import useBearerToken from '@sqrtthree/axios-use-bearer-token'

const getAccessToken = () => {
  return 'your access token'
}

axios.interceptors.request.use(
  useBearerToken({
    getAccessToken,
  })
)
```

### Options

#### `getAccessToken: () => string | Promise<string>`

A function to return access token string that will be added to request header.

---

> [sqrtthree.com](https://sqrtthree.com/) &nbsp;&middot;&nbsp;
> GitHub [@sqrthree](https://github.com/sqrthree) &nbsp;&middot;&nbsp;
> Twitter [@sqrtthree](https://twitter.com/sqrtthree)
