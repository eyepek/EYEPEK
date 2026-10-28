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


## GitHub Pages deployment

The site is built with Vite. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the app and deploys the generated `dist` directory to GitHub Pages whenever changes are pushed to `main`.
