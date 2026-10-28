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

## Production hosting

The production website is served at [www.eyepek.com](https://www.eyepek.com/) through Vercel. The Vercel project is connected to the `main` branch of this repository; pushes to `main` should trigger a production deployment when the Git integration is active.

## GitHub Pages deployment

The site is built with Vite. The GitHub Actions workflow in `.github/workflows/deploy.yml` separately builds the app and deploys the generated `dist` directory to GitHub Pages whenever changes are pushed to `main`. A successful GitHub Pages workflow does not by itself confirm that the Vercel production domain has been updated.
