export default function LoadingScreen() {
    return (
        <div className="absolute inset-0 bg-dark-900 flex items-center justify-center z-50">
            <div className="text-center px-4">
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400 text-sm md:text-base">Chargement du moteur 3D...</p>
            </div>
        </div>
    )
}
