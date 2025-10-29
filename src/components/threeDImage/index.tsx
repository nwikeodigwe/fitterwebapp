import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import DepthPlane from "./depthPlane";

interface Props {
  depthMap: string;
  colorMap: string;
}

const Index = ({ depthMap, colorMap }: Props) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 50 }}
      gl={{ alpha: true }}
      style={{ background: "transparent" }}
      className="w-full"
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // black with 0 alpha = transparent
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 0, 5]} intensity={0.2} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} />
      <DepthPlane depth={depthMap} color={colorMap} />
      <Environment preset="city" background={false} />
      <OrbitControls
        enableZoom
        enableRotate
        enablePan
        minDistance={0.5}
        maxDistance={20}
      />
    </Canvas>
  );
};

export default Index;
