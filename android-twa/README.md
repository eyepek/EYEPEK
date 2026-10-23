# EYEPEK College Android app

This is the Android Trusted Web Activity project for EYEPEK College.

- App name: EYEPEK College
- Android application ID: `com.eyepek.college`
- Website: `https://www.eyepek.com/`
- Target SDK: Android 16 / API 36

## Before publishing

1. Deploy the current website/PWA so these URLs serve the real files, not the website's HTML fallback:
   - `https://www.eyepek.com/manifest.webmanifest`
   - `https://www.eyepek.com/images/eyepek-app-icon-512.png`
2. Create the app in Google Play Console and configure Play App Signing.
3. Build and sign an Android App Bundle (`.aab`) with a private upload key. Keep that key and its password safely; do not commit them to GitHub.
4. Use the SHA-256 fingerprint shown in Play Console to publish the Digital Asset Links file at `https://www.eyepek.com/.well-known/assetlinks.json`. This verifies that EYEPEK owns the domain used by the app.
5. Complete the Play Store listing, including privacy policy and Data safety answers, then submit the signed `.aab` for review.

The Android source has been generated, but it is not a signed, publishable App Bundle yet. The domain files, signing key, and Play Console setup are required before release.
