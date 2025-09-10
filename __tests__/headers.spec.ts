import { fatcher } from 'fatcher';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { progress } from '../src';

const result = Array.from({ length: 10 }, () => Math.random().toString(36).slice(-6));

const server = setupServer(
  http.get('https://foo.bar', async () => {
    return new HttpResponse(
      new ReadableStream({
        async start(controller) {
          for await (const chunk of result) {
            await new Promise(resolve => {
              setTimeout(() => {
                controller.enqueue(Buffer.from(chunk));
                resolve(chunk);
              }, 100 * Math.random());
            });
          }
          controller.close();
        },
      }),
      {
        headers: {
          'content-length': '',
        },
      },
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Response Headers', () => {
  it('Never process callback when response content-length invalid', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [progress],
      onDownloadProgress: () => {
        throw new Error('processed');
      },
    });
    expect(await response.text()).toBe(result.join(''));
  });
});
