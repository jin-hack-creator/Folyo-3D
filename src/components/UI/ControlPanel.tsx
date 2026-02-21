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
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-full px-3 md:px-0">
            <div className="glass px-3 md:px-6 py-3 md:py-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 overflow-x-auto">
                {/* Boutons de mode */}
                <div className="flex gap-1 md:gap-2">
                    <button
                        onClick={() => setMode('disassembly')}
                        className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-base rounded-lg font-medium transition-all-smooth whitespace-nowrap ${mode === 'disassembly'
                                ? 'bg-accent-primary text-white neon-glow'
                                : 'bg-dark-600 text-gray-300 hover:bg-dark-700'
                            }`}
                    >
                        🔧 Démontage
                    </button>
                    <button
                        onClick={() => setMode('assembly')}
                        className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-base rounded-lg font-medium transition-all-smooth whitespace-nowrap ${mode === 'assembly'
                                ? 'bg-accent-success text-white'
                                : 'bg-dark-600 text-gray-300 hover:bg-dark-700'
                            }`}
                    >
                        🔩 Remontage
                    </button>
                </div>

                {/* Séparateur */}
                <div className="hidden md:block w-px h-8 bg-gray-600" />

                {/* Contrôles de navigation */}
                <div className="flex items-center gap-1 md:gap-2">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0 || isAnimating}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-dark-600 text-white flex items-center justify-center hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all-smooth text-xs md:text-base"
                    >
                        ◀
                    </button>

                    <span className="text-gray-300 min-w-[45px] md:min-w-[60px] text-center text-xs md:text-base">
                        {currentStep} / {totalSteps}
                    </span>

                    <button
                        onClick={nextStep}
                        disabled={currentStep === totalSteps || isAnimating || mode === 'idle'}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-dark-600 text-white flex items-center justify-center hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all-smooth text-xs md:text-base"
                    >
                        ▶
                    </button>
                </div>

                {/* Séparateur */}
                <div className="hidden md:block w-px h-8 bg-gray-600" />

                {/* Actions supplémentaires */}
                <div className="flex gap-1 md:gap-2">
                    <button
                        onClick={toggleExplodedView}
                        className={`px-2 md:px-4 py-1 md:py-2 text-xs md:text-base rounded-lg font-medium transition-all-smooth whitespace-nowrap ${isExplodedView
                                ? 'bg-accent-warning text-dark-900'
                                : 'bg-dark-600 text-gray-300 hover:bg-dark-700'
                            }`}
                    >
                        💥 Vue éclatée
                    </button>

                    <button
                        onClick={resetAssembly}
                        className="px-2 md:px-4 py-1 md:py-2 text-xs md:text-base rounded-lg bg-dark-600 text-gray-300 hover:bg-red-600 hover:text-white transition-all-smooth whitespace-nowrap"
                    >
                        🔄 Reset
                    </button>
                </div>
            </div>
        </div>
    )
}
