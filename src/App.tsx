import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import EngineScene from './components/Scene/EngineScene'
import ControlPanel from './components/UI/ControlPanel'
import StepIndicator from './components/UI/StepIndicator'
import Header from './components/UI/Header'
import QRCodeModal from './components/UI/QRCodeModal'


function App() {
    return (
        <div className="w-full h-full relative bg-dark-900">
            {/* Header */}
            <Header />

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [5, 4, 5], fov: 50 }}
                shadows
                className="absolute inset-0"
            >
                <Suspense fallback={null}>
                    <EngineScene />
                </Suspense>
            </Canvas>



            {/* UI Overlays */}
            <StepIndicator />
            <ControlPanel />
            <QRCodeModal />
        </div>
    )
}

export default App
