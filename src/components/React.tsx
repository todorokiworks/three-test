import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';

type BoxProps = {
    position: [x: number, y: number, z: number];
};

const Box: React.FC<BoxProps> = (props) => {
    const mesh = useRef<Mesh>(null!);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    useFrame(() => (mesh.current.rotation.x += 0.01));

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? 1.5 : 1}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
};

const Rig = ({ v = new Vector3() }) => {
    return useFrame((state) => {
        state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05)
    })
};

export const Home = () => (

    <>
        < div style={{ width: '100vw', height: '100vh' }}>
            <Canvas>
                <Rig />
                <ambientLight />
                <fog attach="fog" color={"#fff"} near={1} far={20} />
                <pointLight position={[10, 10, 10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
                <Box position={[0, 1, -10]} />
                <Text
                    position={[0.6, 1, 0]}

                    fontSize={4}
                    color={'#FFC15E'}
                >
                    HELLO
                </Text>
                <Text
                    position={[0, 0, 2]}

                    fontSize={6}
                    color={'#F7934C'}
                >
                    WORLD
                </Text>
            </Canvas>
        </div >
    </>
);