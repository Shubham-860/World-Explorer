# World Explorer

World Explorer is an Angular web application for browsing and searching country information from around the world.

The app lets users explore countries, view flags, search by country name, filter by region, and open a detailed country profile with geography, population, currency, language, membership, and map links.

## Features

- Home page with country search and region shortcuts
- Countries listing page with flag cards
- Search countries by name
- Browse countries by region
- Pagination for the countries list
- Country details page with:
  - Flag and official name
  - Population, area, capital, and timezone
  - Languages and currencies
  - Region, subregion, borders, and driving side
  - Government and membership information
  - External links such as official website, Google Maps, Wikipedia, and OpenStreetMap

## Tech Stack

- Angular 22
- TypeScript
- Tailwind CSS
- RxJS
- REST Countries API
- Vitest for testing

## Project Structure

```text
src/
  app/
    components/
      navbar/
      search-bar/
    pages/
      home/
      countries/
      country-details/
    services/
      CountryService.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Open the app in your browser:

```text
http://localhost:4200/
```

## Available Scripts

```bash
npm start
```

Runs the app locally with Angular dev server.

```bash
npm run build
```

Builds the app for production.

```bash
npm test
```

Runs unit tests with Vitest.

```bash
npm run watch
```

Builds the app in watch mode for development.

## App Routes

| Route | Page |
| --- | --- |
| `/` | Home page |
| `/home` | Home page |
| `/countries` | Countries listing |
| `/country/:uuid` | Country details |

## API

This project uses the REST Countries API to load country data, flags, regions, languages, currencies, and related details.

## Build

To create a production build:

```bash
npm run build
```

The compiled files are generated in the `dist/` directory.
