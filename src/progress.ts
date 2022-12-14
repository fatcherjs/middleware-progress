import { Middleware, readStreamByChunk, defineMiddleware } from 'fatcher';
import { ProgressOptions } from './interfaces';

/**
 * A Middleware for getting progress
 * @param options
 * @returns
 */
export function progress(options: ProgressOptions = {}): Middleware {
    const { onDownloadProgress, lengthName = 'content-length' } = options;

    return defineMiddleware(async (context, next) => {
        const result = await next();

        if (!onDownloadProgress) {
            return result;
        }

        const total = ~~(result.headers.get(lengthName) || 0);

        if (total === 0) {
            return result;
        }

        let current = 0;

        const clonedResponse = result.data.clone();

        readStreamByChunk(clonedResponse.body, chunk => {
            current += chunk.length;
            onDownloadProgress(current, total);
        });

        return result;
    }, 'fatcher-middleware-progress');
}
