import { useEffect, useState } from 'react'

const InstallAppButton = () => {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const handleInstallPrompt = (event) => {
      event.preventDefault()
      setInstallPrompt(event)
    }
    const handleInstalled = () => {
      setInstalled(true)
      setInstallPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleInstallPrompt)
    window.addEventListener('appinstalled', handleInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  if (installed || !installPrompt) return null

  const install = async () => {
    await installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome !== 'accepted') setInstallPrompt(null)
  }

  return (
    <button
      type="button"
      onClick={install}
      className="rounded-full border border-orange-300/70 px-3 py-1.5 font-bold text-orange-100 transition hover:bg-orange-400 hover:text-blue-950"
      aria-label="Install EYEPEK College app"
    >
      Install App
    </button>
  )
}

export default InstallAppButton
