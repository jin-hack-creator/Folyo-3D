export default function Header() {
    return (
        <header className="absolute top-0 left-0 right-0 z-10 p-6">
            <div className="glass px-6 py-4 inline-block">
                <h1 className="text-2xl font-bold">
                    <span className="text-3xl mr-2">⚙️</span>
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Industrial Engine 3D
                    </span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    Simulateur de Démontage / Remontage - Moteur 4 Cylindres
                </p>
                <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">17 pièces</span>
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Interactif</span>
                </div>
            </div>
        </header>
    )
}
