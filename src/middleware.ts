import { readStreamByChunk } from '@fatcherjs/utils-shared';
import { FatcherMiddleware } from 'fatcher';

export const progress: FatcherMiddleware = {
  name: 'fatcher-middleware-progress',
  use: async (context, next) => {
    const { onDownloadProgress } = context;

    const response = await next();

    if (!onDownloadProgress || !response.body || response.bodyUsed) {
      return response;
    }

    const total = Number(response.headers.get('content-length') || 0);

    if (!total) {
      return response;
    }

    let current = 0;

    const clonedResponse = response.clone();

    readStreamByChunk(response.body, chunk => {
      current += chunk.length;
      onDownloadProgress(current, total);
    });

    return clonedResponse;
  },
};
