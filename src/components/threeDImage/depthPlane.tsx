import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  depth: string;
  color: string;
}

const DepthPlane = ({ depth, color }: Props) => {
  const colorMap = useLoader(THREE.TextureLoader, color);
  const depthMap = useLoader(THREE.TextureLoader, depth);

  //   const geometry = new THREE.PlaneGeometry(1, 1, 256, 256);

  const geometry = new THREE.SphereGeometry(1, 128, 128);

  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({
    map: colorMap,
    displacementMap: depthMap,
    displacementScale: 0.5,
    // normalMap: normalMap, // Optional: enhances surface detail
    // normalScale: normalMap ? new THREE.Vector2(1, 1) : undefined,
    metalness: 0.2, // Adjust for lighting realism
    roughness: 0.8,
  });

  //   const material = new THREE.MeshBasicMaterial({ map: colorMap });

  return <mesh geometry={geometry} material={material} />;
};

export default DepthPlane;
