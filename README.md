# ShortDrama Downloader

Next.js app for analyzing public short-drama page metadata.

## Features
- URL analyzer for ShortDrama.st
- Open Graph title/description/thumbnail extraction
- Clean responsive UI
- Safe download policy: no DRM, VIP, login, token, player or access-control bypass
- Ready for Vercel

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Legal download adapter

If you have authorization to distribute a video, add a source adapter that returns a direct media URL or an official download URL. Keep access controls intact and do not extract protected streams.