import { useAssemblyStore } from '../../store/useAssemblyStore'

export default function ControlPanel() {
    const {
        mode,
        setMode,
        nextStep,
        prevStep,
        currentStep,
        totalSteps,
        isExplodedView,
        toggleExplodedView,
        resetAssembly,
        isAnimating
    } = useAssemblyStore()

    return (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
            <div className="glass px-6 py-4 flex items-center gap-4">
                {/* Boutons de mode */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setMode('disassembly')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all-smooth ${mode === 'disassembly'
                                ? 'bg-accent-primary text-white neon-glow'
                                : 'bg-dark-600 text-gray-300 hover:bg-dark-700'
                            }`}
                    >
                        🔧 Démontage
                    </button>
                    <button
                        onClick={() => setMode('assembly')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all-smooth ${mode === 'assembly'
                                ? 'bg-accent-success text-white'
                                : 'bg-dark-600 text-gray-300 hover:bg-dark-700'
                            }`}
                    >
                        🔩 Remontage
                    </button>
                </div>

                {/* Séparateur */}
                <div className="w-px h-8 bg-gray-600" />

                {/* Contrôles de navigation */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0 || isAnimating}
                        className="w-10 h-10 rounded-full bg-dark-600 text-white flex items-center justify-center hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all-smooth"
                    >
                        ◀
                    </button>

                    <span className="text-gray-300 min-w-[60px] text-center">
                        {currentStep} / {totalSteps}
                    </span>

                    <button
                        onClick={nextStep}
                        disabled={currentStep === totalSteps || isAnimating || mode === 'idle'}
                        className="w-10 h-10 rounded-full bg-dark-600 text-white flex items-center justify-center hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all-smooth"
                    >
                        ▶
                    </button>
                </div>

                {/* Séparateur */}
                <div className="w-px h-8 bg-gray-600" />

                {/* Actions supplémentaires */}
                <div className="flex gap-2">
                    <button
                        onClick={toggleExplodedView}
                        className={`px-4 py-2 rounded-lg font-medium transition-all-smooth ${isExplodedView
                                ? 'bg-accent-warning text-dark-900'
                                : 'bg-dark-600 text-gray-300 hover:bg-dark-700'
                            }`}
                    >
                        💥 Vue éclatée
                    </button>

                    <button
                        onClick={resetAssembly}
                        className="px-4 py-2 rounded-lg bg-dark-600 text-gray-300 hover:bg-red-600 hover:text-white transition-all-smooth"
                    >
                        🔄 Reset
                    </button>
                </div>
            </div>
        </div>
    )
}
