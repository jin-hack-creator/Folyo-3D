export default function LoadingScreen() {
    return (
        <div className="absolute inset-0 bg-dark-900 flex items-center justify-center z-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Chargement du moteur 3D...</p>
            </div>
        </div>
    )
}
