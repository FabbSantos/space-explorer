import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'

export default function CameraControls() {
    const { camera } = useThree()
    const controlsRef = useRef<OrbitControlsType>(null)

    useEffect(() => {
        if (controlsRef.current) {
            // Configurações iniciais dos controles
            controlsRef.current.minDistance = 20
            controlsRef.current.maxDistance = 500
            controlsRef.current.enablePan = true
            controlsRef.current.enableRotate = true
            controlsRef.current.enableZoom = true
            controlsRef.current.zoomSpeed = 0.5
            controlsRef.current.rotateSpeed = 0.5
            controlsRef.current.panSpeed = 0.5
        }
    }, [])

    return (
        <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            makeDefault
        />
    )
}