# Hono minimal project

This is a minimal project with [Hono](https://github.com/honojs/hono/) for Cloudflare Workers.

## Features

- Minimal
- TypeScript
- Wrangler to develop and deploy.
- [Jest](https://jestjs.io/ja/) for testing.

## Usage

Install

```
bun install
```

Develop

```
bun run dev
```

Test

```
bun run test
```

Deploy

```
bun run deploy
```

## Notes:

Setting up local db:

```sh
bun wrangler d1 execute tails-db --local --file=./migrations/schema.sql
```
