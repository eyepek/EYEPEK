import { FaDownload } from 'react-icons/fa'

const InstallAppButton = () => (
  <a
    href="https://github.com/eyepek/EYEPEK/releases/download/android-latest/app-release.apk"
    className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-700 to-blue-950 py-1.5 pl-1.5 pr-4 text-white shadow-md shadow-blue-950/20 ring-1 ring-white/30 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
    aria-label="Download EYEPEK Android App"
    title="Download EYEPEK App"
  >
    <img src="/images/eyepek-app-icon-180.png" alt="" aria-hidden="true" className="h-9 w-9 rounded-full object-cover ring-1 ring-white/40" />
    <span className="flex flex-col items-start leading-tight">
      <span className="text-sm font-extrabold tracking-wide">GET APP</span>
      <span className="text-[10px] text-blue-100">EYEPEK for Android</span>
    </span>
    <FaDownload aria-hidden="true" className="ml-1 h-3.5 w-3.5 text-orange-300" />
  </a>
)

export default InstallAppButton
