import axios from 'axios';
import { apiClientFactory } from '@vue-storefront/middleware';
import { MiddlewareConfig } from './index';
import * as apiEndpoints from './api';
import { devHeaderExtension } from 'packages/api-client/src/extensions';

/**
 * In here you should create the client you'll use to communicate with the backend.
 * Axios is just an example.
 */
const buildClient = () => {
  const axiosInstance = axios.create();
  return axiosInstance
}

const onCreate = (settings: MiddlewareConfig) => {
  const client = buildClient();

  client.defaults.headers['auth-x-1'] = 'let-me-in'
  client.defaults.headers['dev-mode'] = settings?.headers?.devMode ?? ''

  return {
    config: settings,
    client
  };
};

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: apiEndpoints,
  extensions: [devHeaderExtension]
});

export { createApiClient };
