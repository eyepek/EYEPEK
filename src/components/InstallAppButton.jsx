import { FaAndroid, FaDownload } from 'react-icons/fa'

const InstallAppButton = () => (
  <a
    href="https://github.com/eyepek/EYEPEK/releases/download/android-latest/app-release.apk"
    className="group relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 bg-white text-blue-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
    aria-label="Download EYEPEK Android App"
    title="Download EYEPEK App"
  >
    <FaAndroid aria-hidden="true" className="h-6 w-6" />
    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-blue-950 bg-orange-400 text-blue-950">
      <FaDownload aria-hidden="true" className="h-2 w-2" />
    </span>
  </a>
)

export default InstallAppButton
