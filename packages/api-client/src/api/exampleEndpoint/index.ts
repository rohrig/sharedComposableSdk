import { Endpoints } from '../../types';

export const exampleEndpoint: Endpoints['exampleEndpoint'] = async (
  context,
  params
) => {
  console.log('exampleEndpoint has been called');

  // Example request could look like this:
  // return await context.client.get(`example-url?id=${params.id}`);

  const data = {
    key1: 'value1',
    key2: 'value2'
  };
  
  try {
    return await context.client.post('http://localhost:5666', data)
  } catch (error) {
    // console.log('error', error)

  }
  return { data: 'Hello, Vue Storefront Integrator!' };
};
