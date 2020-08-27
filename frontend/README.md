# FeedGrabber | Browser client

## Setup

```
npm i
```

Copy .env.example file to .env in the root of /frontend folder

## Run

```
npm start
```

## API configuration

To configure API address you need to change the `src/setupProxy.js` and set the correct port.

## Environment variables

To use Environment variables you need to create a file `.env` in the root of `frontend` folder and add your variable

```
VAR=value
```

To use Environment variable in the application you need to extend `src/env.ts` file

```
import { getOsEnv } from 'helpers/path.helper';

export const env = {
  value: getOsEnv('VALUE')
};

```
