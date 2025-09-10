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
          'content-length': `${result.length * 6}`,
        },
      },
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Basic', () => {
  it('Basic Using', async () => {
    let i = 0;

    const response = await fatcher('https://foo.bar', {
      middlewares: [progress],
      onDownloadProgress: (current, total) => {
        expect(current).toBe(6 * (i + 1));
        expect(total).toBe(result.length * 6);
        i++;
      },
    });
    expect(await response.text()).toBe(result.join(''));
  });
});
