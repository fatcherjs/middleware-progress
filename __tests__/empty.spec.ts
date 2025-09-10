import { fatcher } from 'fatcher';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { progress } from '../src';

const server = setupServer(
  http.get('https://foo.bar', async () => {
    return new HttpResponse();
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Empty Response', () => {
  it('Never process callback', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [progress],
      onDownloadProgress: () => {
        throw new Error('processed.');
      },
    });
    expect(response.body).toBe(null);
  });
});
