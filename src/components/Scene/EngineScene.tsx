import { OrbitControls, Environment, ContactShadows, Float, Sparkles, Stars } from '@react-three/drei'
import { useAssemblyStore } from '../../store/useAssemblyStore'
import EnginePart from '../Engine/EnginePart'

export default function EngineScene() {
    const { parts, isExplodedView } = useAssemblyStore()

    return (
        <>
            {/* Éclairage professionnel de studio */}
            <ambientLight intensity={0.4} />

            {/* Key Light - Lumière principale */}
            <directionalLight
                position={[10, 15, 8]}
                intensity={2}
                castShadow
                shadow-mapSize={[4096, 4096]}
                shadow-bias={-0.0001}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* Fill Light */}
            <directionalLight position={[-8, 8, -8]} intensity={0.6} color="#c4d4e8" />

            {/* Rim Light - Contour */}
            <directionalLight position={[0, -5, -10]} intensity={0.4} color="#ffffff" />

            {/* Accent lights */}
            <pointLight position={[3, 6, 3]} intensity={0.8} color="#3b82f6" />
            <pointLight position={[-3, 4, -3]} intensity={0.4} color="#f59e0b" />
            <pointLight position={[0, -2, 5]} intensity={0.3} color="#10b981" />

            {/* Environnement HDR studio pour reflets réalistes */}
            <Environment preset="studio" environmentIntensity={0.6} />

            {/* Étoiles en arrière-plan */}
            <Stars radius={50} depth={50} count={1000} factor={2} fade speed={0.5} />

            {/* Particules subtiles */}
            <Sparkles
                count={80}
                scale={15}
                size={1.5}
                speed={0.2}
                opacity={0.15}
                color="#3b82f6"
            />

            {/* Ombres au sol */}
            <ContactShadows
                position={[0, -2.5, 0]}
                opacity={0.8}
                scale={20}
                blur={3}
                far={6}
                color="#000000"
            />

            {/* Sol réfléchissant premium */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial
                    color="#080810"
                    metalness={0.95}
                    roughness={0.3}
                    envMapIntensity={0.4}
                />
            </mesh>

            {/* Grilles techniques */}
            <gridHelper args={[30, 60, '#1e3a5f', '#0a1628']} position={[0, -2.49, 0]} />

            {/* Moteur avec animation flottante subtile */}
            <Float
                speed={1}
                rotationIntensity={0}
                floatIntensity={0.08}
                floatingRange={[-0.02, 0.02]}
            >
                <group position={[0, 0.5, 0]}>
                    {parts.map((part) => (
                        <EnginePart
                            key={part.id}
                            part={part}
                            isExplodedView={isExplodedView}
                        />
                    ))}
                </group>
            </Float>

            {/* Contrôles caméra optimisés */}
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={25}
                minPolarAngle={Math.PI / 8}
                maxPolarAngle={Math.PI / 1.5}
                autoRotate={false}
                autoRotateSpeed={0.3}
                dampingFactor={0.05}
                enableDamping={true}
            />
        </>
    )
}
