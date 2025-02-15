# KeepMeAccountable
An idea that might be nothing, we'll see.

Currently creating this to keep me coldplunging. When everything is working, it would be cool to rewrite it so the use-case can be set by user.

Will be quite messy as I'm learning by doing.
## TODO
- styling
- introduce caching to minimize DB requests

## Stack
- React Native
- Typescript
- Tamagui
- Supabase
- Expo

# Step by step guide from start to launch

## Getting started

```shell
# Create and link github repo

# New project from Tamahui
npm create tamagui@latest

# Select: Expo-Router
```

## Update SDK
```shell
# schmack the following into the terminal
npx expo install expo@latest
npx expo install --fix
```

## Install dependencies

```shell
# SUPABASE
npm install @supabase/supabase-js
npm install react-native-url-polyfill/auto
npm install @react-native-async-storage/async-storage
```

## Configure Supabase

Create a `.env` file for storing secrets (DON'T UPLOAD TO GITHUB!!! update .gitignore to avoid an accident)

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

Update the Supabase client initiation in `src/initSupabase.ts`:

```ts

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
```



## Run the app
```shell
npx expo start
```

scan the QR code in the `Expo Go` app.


---

README pt 2

# Keep Me Accountable

Introduction to the App

## Prerequisites for further development

- Expo Go App for further dev
  - `App Store / Play Store`
- Supabase DB
  - `www.supabase.com`

## Get going

1. clone the repo
2. run npm install
3. create a .env file with supabase credentials
4. set permissions in supabase

## Troubleshooting

1. Consistant error that shouldn't persist?
   1. Try clearing the cache with `npx expo start --reset-cache`
note because this is in a monorepo had to remove react, react-dom, and react-native-web deps and change metro.config.js a bit.
