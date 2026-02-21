import { useAssemblyStore } from '../../store/useAssemblyStore'

export default function StepIndicator() {
    const { parts, mode, currentStep } = useAssemblyStore()

    if (mode === 'idle') return null

    // Trier les pièces par ordre (inverse pour le remontage)
    const sortedParts = mode === 'assembly'
        ? [...parts].sort((a, b) => b.order - a.order)
        : [...parts].sort((a, b) => a.order - b.order)

    return (
        <div className="absolute top-20 md:top-24 right-3 md:right-6 z-10 w-full md:w-80 max-w-sm md:max-w-none px-2 md:px-0">
            <div className="glass p-3 md:p-5">
                <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 flex items-center gap-2">
                    {mode === 'disassembly' ? (
                        <>
                            <span className="text-xl md:text-2xl">🔧</span>
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent truncate">
                                Démontage Moteur
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="text-xl md:text-2xl">🔩</span>
                            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent truncate">
                                Remontage Moteur
                            </span>
                        </>
                    )}
                </h2>

                <div className="space-y-2 max-h-[250px] md:max-h-[400px] overflow-y-auto pr-2">
                    {sortedParts.map((part, index) => {
                        const stepNumber = index + 1
                        const isCurrentStep = stepNumber === currentStep
                        const isCompleted = stepNumber < currentStep

                        return (
                            <div
                                key={part.id}
                                className={`flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl transition-all duration-300 ${isCurrentStep
                                        ? 'bg-gradient-to-r from-accent-primary/30 to-accent-secondary/20 border border-accent-primary/50 scale-[1.02]'
                                        : isCompleted
                                            ? 'bg-accent-success/10 border border-accent-success/30'
                                            : 'bg-dark-700/50 border border-transparent'
                                    }`}
                            >
                                {/* Indicateur d'état */}
                                <div
                                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0 transition-all duration-300 ${isCompleted
                                            ? 'bg-accent-success text-white'
                                            : isCurrentStep
                                                ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/50 animate-pulse'
                                                : 'bg-dark-600 text-gray-400'
                                        }`}
                                >
                                    {isCompleted ? '✓' : stepNumber}
                                </div>

                                {/* Informations de la pièce */}
                                <div className="flex-1 min-w-0">
                                    <p className={`text-xs md:text-base font-semibold ${isCurrentStep ? 'text-white' : isCompleted ? 'text-accent-success' : 'text-gray-300'
                                        } break-words`}
                                    >
                                        {part.nameFr}
                                    </p>
                                    <p className="text-xs text-gray-500 break-words hidden md:block">{part.name}</p>
                                    {isCurrentStep && (
                                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                                            {part.description}
                                        </p>
                                    )}
                                </div>

                                {/* Indicateur de couleur */}
                                <div
                                    className="w-4 h-4 md:w-5 md:h-5 rounded-full flex-shrink-0 ring-2 ring-white/20"
                                    style={{ backgroundColor: part.color }}
                                />
                            </div>
                        )
                    })}
                </div>

                {/* Barre de progression */}
                <div className="mt-3 md:mt-5">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Progression</span>
                        <span className="font-mono">{currentStep} / {parts.length}</span>
                    </div>
                    <div className="h-2 md:h-3 bg-dark-600 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{
                                width: `${(currentStep / parts.length) * 100}%`,
                                background: mode === 'disassembly'
                                    ? 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
                                    : 'linear-gradient(90deg, #10b981, #34d399)'
                            }}
                        />
                    </div>
                    <p className="text-center text-xs md:text-sm font-bold mt-2" style={{
                        color: mode === 'disassembly' ? '#3b82f6' : '#10b981'
                    }}>
                        {Math.round((currentStep / parts.length) * 100)}%
                    </p>
                </div>

                {/* Instructions */}
                {currentStep === 0 && (
                    <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent-primary/10 border border-accent-primary/30 rounded-lg">
                        <p className="text-xs md:text-sm text-gray-300">
                            👆 Cliquez sur <strong>▶</strong> pour commencer le {mode === 'disassembly' ? 'démontage' : 'remontage'}
                        </p>
                    </div>
                )}

                {currentStep === parts.length && (
                    <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent-success/10 border border-accent-success/30 rounded-lg">
                        <p className="text-xs md:text-sm text-accent-success font-semibold">
                            ✅ {mode === 'disassembly' ? 'Démontage' : 'Remontage'} terminé !
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
