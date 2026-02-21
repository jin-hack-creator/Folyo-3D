import { create } from 'zustand'

// Pièces du moteur industriel KEYOU (basé sur l'image de référence)
export interface EnginePart {
    id: string
    name: string
    nameFr: string
    description: string
    position: [number, number, number]
    explodedPosition: [number, number, number]
    rotation?: [number, number, number]
    color: string
    order: number
    isAssembled: boolean
}

interface AssemblyState {
    mode: 'idle' | 'disassembly' | 'assembly'
    currentStep: number
    totalSteps: number
    isExplodedView: boolean
    isAnimating: boolean
    parts: EnginePart[]
    selectedPartId?: string | null
    setMode: (mode: 'idle' | 'disassembly' | 'assembly') => void
    nextStep: () => void
    prevStep: () => void
    goToStep: (step: number) => void
    toggleExplodedView: () => void
    setIsAnimating: (animating: boolean) => void
    resetAssembly: () => void
    disassemblePart: (partId: string) => void
    assemblePart: (partId: string) => void
    setSelectedPart: (partId: string | null) => void
    setPartRotation: (partId: string, rotation: [number, number, number]) => void
}

// Pièces du moteur industriel 4 cylindres en ligne (style KEYOU)
const initialParts: EnginePart[] = [
    // === PARTIE HAUTE (démontage en premier) ===
    {
        id: 'ecu-box',
        name: 'ECU Box',
        nameFr: 'Boîtier ECU',
        description: 'Unité de contrôle électronique du moteur',
        position: [1.8, 2.8, 0],
        explodedPosition: [4, 5, 0],
        color: '#1e3a5f', // Bleu foncé
        rotation: [0, 0, 0],
        order: 1,
        isAssembled: true
    },
    {
        id: 'ignition-coils',
        name: 'Ignition Coils',
        nameFr: 'Bobines d\'allumage',
        description: 'Génèrent l\'étincelle pour la combustion',
        position: [0, 2.6, 0],
        explodedPosition: [0, 5.5, 0],
        color: '#1e3a5f', // Bleu foncé KEYOU
        rotation: [0, 0, 0],
        order: 2,
        isAssembled: true
    },
    {
        id: 'valve-cover',
        name: 'Valve Cover',
        nameFr: 'Couvre-culasse',
        description: 'Protège l\'arbre à cames et les soupapes',
        position: [0, 2.2, 0],
        explodedPosition: [0, 4.8, 0],
        color: '#2563eb', // Bleu KEYOU
        rotation: [0, 0, 0],
        order: 3,
        isAssembled: true
    },
    {
        id: 'carbon-cover',
        name: 'Carbon Fiber Cover',
        nameFr: 'Cache carbone',
        description: 'Protection esthétique en fibre de carbone',
        position: [0, 1.9, 0.5],
        explodedPosition: [0, 4, 2],
        color: '#1a1a1a', // Noir carbone
        rotation: [0, 0, 0],
        order: 4,
        isAssembled: true
    },
    {
        id: 'intake-runners',
        name: 'Intake Runners',
        nameFr: 'Tubulures d\'admission',
        description: 'Acheminent l\'air vers les cylindres',
        position: [0, 1.5, 0.3],
        explodedPosition: [0, 3.5, 1.5],
        color: '#c0c0c0', // Chrome
        rotation: [0, 0, 0],
        order: 5,
        isAssembled: true
    },
    {
        id: 'throttle-body',
        name: 'Throttle Body',
        nameFr: 'Corps de papillon',
        description: 'Régule le débit d\'air entrant',
        position: [1.5, 1.5, 0.5],
        explodedPosition: [3.5, 3, 1.5],
        color: '#4a5568', // Aluminium foncé
        rotation: [0, 0, 0],
        order: 6,
        isAssembled: true
    },
    // === PARTIE CENTRALE ===
    {
        id: 'cylinder-head',
        name: 'Cylinder Head',
        nameFr: 'Culasse',
        description: 'Contient les soupapes et chambres de combustion',
        position: [0, 1.1, 0],
        explodedPosition: [0, 2.8, 0],
        color: '#9ca3af', // Aluminium
        rotation: [0, 0, 0],
        order: 7,
        isAssembled: true
    },
    {
        id: 'head-gasket',
        name: 'Head Gasket',
        nameFr: 'Joint de culasse',
        description: 'Étanchéité entre bloc et culasse',
        position: [0, 0.85, 0],
        explodedPosition: [0, 2.2, 0],
        color: '#166534', // Vert joint
        rotation: [0, 0, 0],
        order: 8,
        isAssembled: true
    },
    {
        id: 'exhaust-manifold',
        name: 'Exhaust Manifold',
        nameFr: 'Collecteur d\'échappement',
        description: 'Évacue les gaz brûlés',
        position: [-1.5, 0.8, 0],
        explodedPosition: [-4, 1.5, 0],
        color: '#78716c', // Fonte grise
        rotation: [0, 0, 0],
        order: 9,
        isAssembled: true
    },
    {
        id: 'coolant-pipes',
        name: 'Coolant Pipes',
        nameFr: 'Durites de refroidissement',
        description: 'Circulent le liquide de refroidissement',
        position: [0, 0.5, 0.8],
        explodedPosition: [0, 1.2, 2.5],
        color: '#1f2937', // Noir
        rotation: [0, 0, 0],
        order: 10,
        isAssembled: true
    },
    // === BLOC MOTEUR ===
    {
        id: 'pistons',
        name: 'Pistons Assembly',
        nameFr: 'Ensemble Pistons',
        description: '4 pistons avec bielles',
        position: [0, 0.2, 0],
        explodedPosition: [0, 0.8, 0],
        color: '#d97706', // Bronze
        rotation: [0, 0, 0],
        order: 11,
        isAssembled: true
    },
    {
        id: 'engine-block',
        name: 'Engine Block',
        nameFr: 'Bloc moteur',
        description: 'Structure principale en aluminium',
        position: [0, -0.3, 0],
        explodedPosition: [0, -0.3, 0],
        color: '#e5e7eb', // Aluminium clair
        rotation: [0, 0, 0],
        order: 12,
        isAssembled: true
    },
    {
        id: 'crankshaft',
        name: 'Crankshaft',
        nameFr: 'Vilebrequin',
        description: 'Transforme le mouvement linéaire en rotation',
        position: [0, -0.9, 0],
        explodedPosition: [0, -2.2, 0],
        color: '#4b5563', // Acier
        rotation: [0, 0, 0],
        order: 13,
        isAssembled: true
    },
    // === PARTIE BASSE ET ACCESSOIRES ===
    {
        id: 'timing-belt',
        name: 'Timing Belt System',
        nameFr: 'Distribution',
        description: 'Synchronise vilebrequin et arbres à cames',
        position: [1.6, 0, 0],
        explodedPosition: [4, 0, 0],
        color: '#1f2937', // Noir
        rotation: [0, 0, 0],
        order: 14,
        isAssembled: true
    },
    {
        id: 'flywheel',
        name: 'Flywheel / Damper',
        nameFr: 'Volant d\'inertie',
        description: 'Régularise la rotation du moteur',
        position: [-1.8, -0.9, 0],
        explodedPosition: [-4.5, -1.5, 0],
        color: '#9ca3af', // Aluminium
        rotation: [0, 0, 0],
        order: 15,
        isAssembled: true
    },
    {
        id: 'oil-pan',
        name: 'Oil Pan',
        nameFr: 'Carter d\'huile',
        description: 'Réservoir d\'huile de lubrification',
        position: [0, -1.5, 0],
        explodedPosition: [0, -4, 0],
        color: '#374151', // Gris foncé
        rotation: [0, 0, 0],
        order: 16,
        isAssembled: true
    },
    {
        id: 'accessories',
        name: 'Accessories',
        nameFr: 'Accessoires',
        description: 'Alternateur, pompe, compresseur',
        position: [2, -0.5, 0],
        explodedPosition: [5, -0.5, 0],
        color: '#6b7280', // Gris
        rotation: [0, 0, 0],
        order: 17,
        isAssembled: true
    }
]

export const useAssemblyStore = create<AssemblyState>((set, get) => ({
    mode: 'idle',
    currentStep: 0,
    totalSteps: initialParts.length,
    isExplodedView: false,
    isAnimating: false,
    parts: initialParts,
    selectedPartId: null,

    setMode: (mode) => {
        if (mode === 'disassembly') {
            set({
                mode,
                currentStep: 0,
                parts: initialParts.map(p => ({ ...p, isAssembled: true }))
            })
        } else if (mode === 'assembly') {
            set({
                mode,
                currentStep: 0,
                parts: initialParts.map(p => ({ ...p, isAssembled: false }))
            })
        } else {
            set({ mode, currentStep: 0 })
        }
    },

    nextStep: () => {
        const { currentStep, totalSteps, mode, parts, isAnimating } = get()
        if (isAnimating || currentStep >= totalSteps) return

        const newStep = currentStep + 1
        set({ currentStep: newStep, isAnimating: true })

        if (mode === 'disassembly') {
            const partToDisassemble = parts.find(p => p.order === newStep)
            if (partToDisassemble) {
                set({
                    parts: parts.map(p =>
                        p.id === partToDisassemble.id ? { ...p, isAssembled: false } : p
                    )
                })
            }
        } else if (mode === 'assembly') {
            const reverseOrder = totalSteps - newStep + 1
            const partToAssemble = parts.find(p => p.order === reverseOrder)
            if (partToAssemble) {
                set({
                    parts: parts.map(p =>
                        p.id === partToAssemble.id ? { ...p, isAssembled: true } : p
                    )
                })
            }
        }

        setTimeout(() => set({ isAnimating: false }), 600)
    },

    prevStep: () => {
        const { currentStep, mode, parts, totalSteps, isAnimating } = get()
        if (isAnimating || currentStep <= 0) return

        set({ isAnimating: true })

        if (mode === 'disassembly') {
            const partToReassemble = parts.find(p => p.order === currentStep)
            if (partToReassemble) {
                set({
                    parts: parts.map(p =>
                        p.id === partToReassemble.id ? { ...p, isAssembled: true } : p
                    )
                })
            }
        } else if (mode === 'assembly') {
            const reverseOrder = totalSteps - currentStep + 1
            const partToDisassemble = parts.find(p => p.order === reverseOrder)
            if (partToDisassemble) {
                set({
                    parts: parts.map(p =>
                        p.id === partToDisassemble.id ? { ...p, isAssembled: false } : p
                    )
                })
            }
        }

        set({ currentStep: currentStep - 1 })
        setTimeout(() => set({ isAnimating: false }), 600)
    },

    goToStep: (step) => set({ currentStep: step }),
    toggleExplodedView: () => set((state) => ({ isExplodedView: !state.isExplodedView })),
    setIsAnimating: (animating) => set({ isAnimating: animating }),

    resetAssembly: () => set({
        mode: 'idle',
        currentStep: 0,
        isExplodedView: false,
        parts: initialParts.map(p => ({ ...p, isAssembled: true }))
    }),

    disassemblePart: (partId) => set((state) => ({
        parts: state.parts.map(p =>
            p.id === partId ? { ...p, isAssembled: false } : p
        )
    })),

    assemblePart: (partId) => set((state) => ({
        parts: state.parts.map(p =>
            p.id === partId ? { ...p, isAssembled: true } : p
        )
    }))

    ,
    setSelectedPart: (partId) => set({ selectedPartId: partId }),

    setPartRotation: (partId, rotation) => set((state) => ({
        parts: state.parts.map(p => p.id === partId ? { ...p, rotation } : p)
    }))
}))
