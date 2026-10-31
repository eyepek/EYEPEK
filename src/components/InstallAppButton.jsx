import { FaAndroid } from 'react-icons/fa'

const InstallAppButton = () => (
  <a
    href="https://github.com/eyepek/EYEPEK/releases/download/android-latest/app-release.apk"
    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-orange-300/70 text-orange-100 transition hover:bg-orange-400 hover:text-blue-950"
    aria-label="Download EYEPEK Android App"
    title="Download EYEPEK App"
  >
    <FaAndroid aria-hidden="true" className="h-5 w-5" />
  </a>
)

export default InstallAppButton
