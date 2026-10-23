# EYEPEK College

Mobile-friendly college website and installable Progressive Web App (PWA) for EYEPEK College, Patna, Bihar.

## Run locally

```sh
npm install
npm run dev
```

## Build for deployment

```sh
npm run build
npm run preview
```

The production build includes the web app manifest and service worker. Deploy the site over HTTPS to enable app installation and offline access. On Android, open the site in a supported browser and choose **Install App** when it appears. On iPhone, use Safari's **Share → Add to Home Screen**.

The service worker caches the app shell and same-origin assets for offline reopening. Enquiry submissions still require an internet connection.
