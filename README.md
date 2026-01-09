# @fatcherjs/middleware-progress

<div align="center">
  <a href="https://codecov.io/github/fatcherjs/middleware-progress" > 
    <img src="https://codecov.io/github/fatcherjs/middleware-progress/graph/badge.svg?token=JZ22RH00S5"/> 
 </a>
  <a href="https://www.jsdelivr.com/package/npm/@fatcherjs/middleware-progress">
    <img src="https://data.jsdelivr.com/v1/package/npm/@fatcherjs/middleware-progress/badge?style=rounded" alt="jsDelivr">
  </a>
  <a href="https://packagephobia.com/result?p=@fatcherjs/middleware-progress">
    <img src="https://packagephobia.com/badge?p=@fatcherjs/middleware-progress" alt="install size">
  </a>
  <a href="https://unpkg.com/@fatcherjs/middleware-progress">
    <img src="https://img.badgesize.io/https://unpkg.com/@fatcherjs/middleware-progress" alt="Size">
  </a>
  <a href="https://npmjs.com/package/@fatcherjs/middleware-progress">
    <img src="https://img.shields.io/npm/v/@fatcherjs/middleware-progress.svg" alt="npm package">
  </a>
  <a href="https://github.com/fatcherjs/middleware-progress/actions/workflows/ci.yml">
    <img src="https://github.com/fatcherjs/middleware-progress/actions/workflows/ci.yml/badge.svg?branch=master" alt="build status">
  </a>
</div>

## Install

### NPM

```bash
>$ npm install @fatcherjs/middleware-progress
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/fatcher/dist/fatcher.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fatcherjs/middleware-progress/dist/index.min.js"></script>

<script>
  Fatcher.fatcher('url', {
    middlewares: [FatcherMiddlewareProgress],
    onDownloadProgress: (current, total) => {
      // process progress
    },
  }).then(response => {
    console.log(response);
  });
</script>
```

## Usage

```ts
import { fatcher } from 'fatcher';
import { progress } from '@fatcherjs/middleware-progress';

fatcher('https://foo.bar', {
  middlewares: [progress],
});
```

## Options

### onDownloadProgress

```ts
import { fatcher } from 'fatcher';
import { progress } from '@fatcherjs/middleware-progress';

fatcher('https://foo.bar', {
  middlewares: [progress],
  onDownloadProgress: (current, total) => {
    // current received data length
    // total data length
  },
});
```

## License

[MIT](https://github.com/fatcherjs/middleware-progress/blob/master/LICENSE)
