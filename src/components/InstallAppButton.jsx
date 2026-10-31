import { FaDownload } from 'react-icons/fa'

const InstallAppButton = () => (
  <a
    href="https://github.com/eyepek/EYEPEK/releases/download/android-latest/app-release.apk"
    className="group inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 text-white shadow-md shadow-blue-950/20 ring-1 ring-white/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
    aria-label="Download EYEPEK Android App"
    title="Download EYEPEK App"
  >
    <span className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-white/50 text-lg font-black tracking-tight">
      E
      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-400 text-blue-950 ring-2 ring-blue-800">
        <FaDownload aria-hidden="true" className="h-2 w-2" />
      </span>
    </span>
  </a>
)

export default InstallAppButton
