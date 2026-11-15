EYEPEK Learning

Initial online tutoring web portal foundation. This is a separate Vite + React app inside the existing EYEPEK repository, so it does not replace the public company website.

Current stage: responsive branded portal, four role workspace previews, role-specific navigation, module cards and tutor discovery UI with local demo filtering. Dashboard metrics and tutor profiles are illustrative demo data.

Not yet connected: authentication, database-backed profiles, tutor verification, scheduling and booking, live classroom/video, assignments/file storage, payment gateway, notifications and institution data isolation. Preview buttons do not perform these backend actions yet.

Local development: run npm install and npm run dev from this folder.

Vercel: set project root directory to learning, framework to Vite, build command to npm run build, output directory to dist. Backend APIs and payment secrets must be hosted securely; never put payment secret keys in browser code.