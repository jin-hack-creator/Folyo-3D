import { useState } from 'react'
import QRCode from 'qrcode.react'

export default function QRCodeModal() {
    const [isOpen, setIsOpen] = useState(false)
    
    // URL du projet déployé - à configurer via variable d'environnement
    const projectUrl = import.meta.env.VITE_PROJECT_URL || 'https://folyo-3d.vercel.app'

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-20 p-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                title="Afficher le QR code"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>
        )
    }

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-30"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 bg-dark-800 border border-blue-500/30 rounded-lg p-8 shadow-2xl glass">
                <div className="flex flex-col items-center gap-4">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Scannez pour visiter
                        </h2>
                        <p className="text-gray-400 text-sm">{projectUrl}</p>
                    </div>

                    {/* QR Code */}
                    <div className="p-4 bg-white rounded-lg">
                        <QRCode 
                            value={projectUrl} 
                            size={256}
                            level="H"
                            includeMargin={true}
                        />
                    </div>

                    {/* URL Text */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500 mb-4">Scannez avec votre téléphone</p>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </>
    )
}
