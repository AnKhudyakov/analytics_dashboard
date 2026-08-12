# Analytics Dashboard

YouTube analytics dashboard: trending channels and videos with sortable and
filterable tables, per-entity analytics pages (subscribers, views, revenue
estimates), light/dark theming and three locales.

React 19 · TypeScript (strict) · Redux Toolkit Query · Feature-Sliced Design ·
Tailwind 4 · Recharts · Vitest · Storybook

## Screens

| Route                  | What it does                                                   |
| ---------------------- | -------------------------------------------------------------- |
| `/login`, `/signup`    | JWT auth, "remember me" chooses session vs persistent storage  |
| `/channels`            | Channel table: search, sort, range/boolean filters, pagination |
| `/channels/:channelId` | Channel card + subscriber/view/revenue charts                  |
| `/videos`              | Video table with the same table toolkit                        |
| `/videos/:videoId`     | Video card, rolling-revenue charts, tag cloud                  |

All list state (search, page, page size, sort, filters) lives in the query
string, so any table view is a shareable link and the back button works.

## Architecture

[Feature-Sliced Design](https://feature-sliced.design). Imports may only point
down the layer chain, and slices are imported through their `index.ts` only:

```
app       providers, router, store, i18n, layouts, global styles
pages     route-level composition only
widgets   self-contained blocks (sidebar, resource table, analytics blocks)
features  user actions (auth, theme switcher, language switcher)
entities  channel / video: API, types, columns, cards
shared    UI kit, hooks, formatters, API transport, config
```

Both rules are enforced by `eslint-plugin-boundaries` in `eslint.config.js`, so
a layer violation fails `npm run lint` rather than being caught in review.

Notable decisions:

- **One query per resource.** `getChannels` switches between `/channels` and
  `/channels/search` based on the `search` argument, so there is a single
  loading flag and no race between a list request and a search request.
- **Row-oriented table.** `shared/ui/DataTable` takes `columns: Column<T>[]`
  with a `renderCell` per column plus `getRowId` / `getRowHref`. Entities own
  their column definitions (`entities/channel/ui/channelColumns.tsx`), so the
  table itself has no domain knowledge.
- **Access token in memory.** `shared/api/accessToken.ts` holds the token for
  outgoing requests; `features/auth` owns persistence and expiry. A listener
  middleware clears the session on any `401`, and a timer clears it at `exp`.
- **Theme via CSS custom properties** declared in `src/app/styles/index.css`,
  including chart colors — charts are readable in both themes without JS.

### Known limitation

The demo backend issues a long-lived JWT and exposes no refresh endpoint, so the
token is persisted in `localStorage`/`sessionStorage`. With a refresh endpoint
the access token would stay in memory only, with the refresh token in an
httpOnly cookie and a single-flight refresh on `401`.

## Getting started

Requires Node >= 20.11.

```bash
npm install
cp .env.local.template .env.local   # optional local overrides
npm run dev
```

### Environment

| Variable        | Purpose                                        |
| --------------- | ---------------------------------------------- |
| `VITE_API_URL`  | Backend base URL (required; validated at boot) |
| `VITE_BASE_URL` | Public base path for the build                 |

`.env.development` and `.env.production` are committed; `.env.test` holds the
URL that MSW intercepts in tests.

## Scripts

| Script                  | What it does                               |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Vite dev server                            |
| `npm run build`         | Typecheck, then production build           |
| `npm run typecheck`     | `tsc` over `src` and over the config files |
| `npm run lint`          | ESLint, including the FSD boundary rules   |
| `npm run format`        | Prettier                                   |
| `npm test`              | Vitest (unit + integration)                |
| `npm run test:coverage` | Vitest with V8 coverage                    |
| `npm run storybook`     | Storybook for the `shared/ui` kit          |

## Testing

Vitest + Testing Library + MSW (`src/test`). The suite covers the parts that
carry the logic:

- formatters and filter serialization (unit);
- `useTableParams` — URL round-trip, page resets, sort toggling;
- `DataTable` — rendering, `aria-sort`, retry, empty-vs-filtered states,
  filter popup incl. closing on `Escape`;
- `LoginForm` — validation, storage target per "remember me", rejected login;
- `ChannelsPage` — integration against mocked endpoints.

```bash
npm test
```

Quality gates are wired into git hooks (`lint-staged` on pre-commit,
commitlint on commit-msg). Deployment runs on Vercel.
