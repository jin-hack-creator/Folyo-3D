export default function Header() {
    return (
        <header className="absolute top-0 left-0 right-0 z-10 p-3 md:p-6">
            <div className="glass px-3 md:px-6 py-2 md:py-4 inline-block max-w-full">
                <h1 className="text-lg md:text-2xl font-bold">
                    <span className="text-2xl md:text-3xl mr-1 md:mr-2">⚙️</span>
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Industrial Engine 3D
                    </span>
                </h1>
                <p className="text-gray-400 text-xs md:text-sm mt-1">
                    Simulateur de Démontage / Remontage - Moteur 4 Cylindres
                </p>
                <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">17 pièces</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Interactif</span>
                </div>
            </div>
        </header>
    )
}
