// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge";
 
// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import * as THREE from "three";

// export function CanvasRevealEffect({
//   animationSpeed = 0.4,
//   opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
//   colors = [[0, 255, 255]],
//   containerClassName,
//   dotSize,
//   showGradient = true,
// }) {
//   return (
//     <div className={cn("h-full relative bg-white w-full", containerClassName)}>
//       <div className="h-full w-full">
//         <DotMatrix
//           colors={colors || [[0, 255, 255]]}
//           dotSize={dotSize || 3}
//           opacities={opacities || [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]}
//           shader={`float animation_speed_factor = ${animationSpeed.toFixed(1)}; float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15); opacity *= step(intro_offset, u_time * animation_speed_factor); opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);`}
//           center={["x", "y"]}
//         />
//       </div>
//       {showGradient && (
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
//       )}
//     </div>
//   );
// }

// function DotMatrix({
//   colors = [[0, 0, 0]],
//   opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
//   totalSize = 4,
//   dotSize = 2,
//   shader = "",
//   center = ["x", "y"],
// }) {
//   const uniforms = React.useMemo(() => {
//     let colorsArray = [
//       colors[0],
//       colors[0],
//       colors[0],
//       colors[0],
//       colors[0],
//       colors[0],
//     ];
//     if (colors.length === 2) {
//       colorsArray = [
//         colors[0],
//         colors[0],
//         colors[0],
//         colors[1],
//         colors[1],
//         colors[1],
//       ];
//     } else if (colors.length === 3) {
//       colorsArray = [
//         colors[0],
//         colors[0],
//         colors[1],
//         colors[1],
//         colors[2],
//         colors[2],
//       ];
//     }

//     return {
//       u_colors: {
//         value: colorsArray.map((color) => [color[0] / 255, color[1] / 255, color[2] / 255]),
//         type: "uniform3fv",
//       },
//       u_opacities: {
//         value: opacities,
//         type: "uniform1fv",
//       },
//       u_total_size: {
//         value: totalSize,
//         type: "uniform1f",
//       },
//       u_dot_size: {
//         value: dotSize,
//         type: "uniform1f",
//       },
//     };
//   }, [colors, opacities, totalSize, dotSize]);

//   return (
//     <Shader
//       source={`
//         precision mediump float;
//         in vec2 fragCoord;

//         uniform float u_time;
//         uniform float u_opacities[10];
//         uniform vec3 u_colors[6];
//         uniform float u_total_size;
//         uniform float u_dot_size;
//         uniform vec2 u_resolution;
//         out vec4 fragColor;
//         float PHI = 1.61803398874989484820459;
//         float random(vec2 xy) {
//             return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
//         }
//         float map(float value, float min1, float max1, float min2, float max2) {
//             return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
//         }
//         void main() {
//             vec2 st = fragCoord.xy;
//             ${
//               center.includes("x")
//                ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size