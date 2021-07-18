(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.useBearerToken = factory());
}(this, (function () { 'use strict';

  function useBearerToken(options = {}) {
    const { bearerToken } = options;

    if (!bearerToken) {
      throw Error('barerToken is required.')
    }

    return async function interceptor(config) {
      let accessToken = '';

      if (typeof bearerToken === 'string') {
        accessToken = bearerToken;
      } else {
        accessToken = await bearerToken();
      }

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return config
    }
  }

  return useBearerToken;

})));
