# Medium Clone Backend (NestJS + PostgreSQL)

Backend API for a Medium-like blogging platform built with NestJS, TypeORM, and PostgreSQL. Inspired by the RealWorld/Medium clone example at https://github.com/nisabmohd/Medium-clone.

## Stack
- Node.js + NestJS 11
- TypeORM 0.3.x with PostgreSQL
- Jest for testing
- Nodemon + ts-node for local dev

## Prerequisites
- Node.js 18+
- Yarn
- PostgreSQL 14+ running locally on `localhost:5432`

## Quick start
```bash
yarn install
# development (ts-node + nodemon)
yarn start
# production build + run
yarn build && yarn start:prod
```

### Database setup
Default connection is configured in `src/ormconfig.ts`:
```ts
{
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: 'postgres',
  database: 'mediumclone',
  synchronize: true
}
```
Create the DB and user, then grant ownership so TypeORM can create tables:
```sql
CREATE USER mediumclone WITH PASSWORD 'postgres';
CREATE DATABASE mediumclone OWNER mediumclone;
\c mediumclone
ALTER SCHEMA public OWNER TO mediumclone;
GRANT ALL ON SCHEMA public TO mediumclone;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO mediumclone;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO mediumclone;
```
Adjust credentials in `src/ormconfig.ts` (or swap to env vars) if needed.

### Running
- `yarn start` — watch mode via nodemon (`ts-node` + `tsconfig-paths`)
- `yarn start:prod` — runs compiled `dist/main.js`
- `yarn build` — compile to `dist/`

### Testing & linting
- `yarn test` / `yarn test:watch` / `yarn test:cov`
- `yarn lint` — ESLint with auto-fix
- `yarn format` — Prettier for `src` and `test`

## API (early draft)
- `GET /tags` — returns `{ tags: string[] }` from `TagEntity`
More endpoints will follow the Medium/RealWorld spec (articles, auth, profiles, comments).

## Project structure
- `src/ormconfig.ts` — TypeORM connection settings
- `src/tag/*` — example module with entity, controller, service
- `nodemon.json` — watch config for local dev

## Notes
- `synchronize: true` is enabled for local development; switch to migrations before production.
- Environment files (`.env*`) are ignored; create your own `.env` locally if you move config out of code.

## License
This project is currently UNLICENSED. Use privately unless a license is added.
