import { initSDK, buildModule } from '@vue-storefront/sdk';
import { client, boilerplateModule, BoilerplateModuleType } from '../../packages/sdk/src';
import { NuxtApp } from 'nuxt/app';
import { createSharedComposable } from '@vueuse/core';

// Maintain a reference to the interceptor
let interceptorId: number | null = null;

// using createSharedComposable means the server cookies are set once and shared 
// across instances. 
export const useSdk = createSharedComposable(() => {
  const sdkConfig = {
    boilerplate: buildModule<BoilerplateModuleType>(boilerplateModule, {
      apiUrl: 'http://localhost:8181/boilerplate',
    }),
  };

  const {getDevHeader, headerData} = useHeaders()

  getDevHeader()

  // If an interceptor is already set, eject it to remove it
  // this prevents headers being shared across instances
  if (interceptorId !== null) {
    client.interceptors.request.eject(interceptorId);
  }

  interceptorId = client.interceptors.request.use(
    (config) => {
      if (!config.headers) {
        config.headers = {};
      }

      // here you can set any headers you want
      config.headers['amazing-header'] = 'coolest header ever'; 
      config.headers['dev-mode'] = headerData.value?.isDevMode ?? 'false'
      
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return initSDK<typeof sdkConfig>(sdkConfig);
});

