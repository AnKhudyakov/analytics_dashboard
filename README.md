# Weather forecast project

This repository contains Weather forecast web app

# Install

## Pre requisites

1. Git
2. Node

Run

```
npm i
```

to install dependencies

# Usage

## Setup environment

Create a file .env.local by using the template .env.local.template.

```
VITE_API_KEY=<API KEY>
```

## Running the app

With local backend

```
npm run start:localdev
```

With dev backend

```
npm run start:dev
```

With production backend

```
npm run start:prod
```

## Building the app

With local backend

```
npm run build-localdev
```

With dev backend

```
npm run build-dev
```

With production backend

```
npm run build-prod
```

## Includes

### deploy to gh-pages [workflow](.github/workflows/pages.yml)

Allows to deploy spa project to github pages via github action

Please adjust `VITE_BASE_URL` in [.env](.env) to fit your repo name

### [storybook](https://storybook.js.org/)

I use Storybook for building UI components and pages in isolation.

```
npm run storybook
```

### npm-check-updates helper

I use this tool weekly to manually update the dependencies

### [vite-plugin-checker](https://vite-plugin-checker.netlify.app/)

Vite plugin that provide checks e.g. `[TypeScript] Found 0 errors. Watching for file changes.`

### local https via [vite-plugin-mkcert](https://www.npmjs.com/package/vite-plugin-mkcert)

Allows to use https://localhost in development
