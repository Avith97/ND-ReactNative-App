// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Svg, { Circle, Text as SvgText } from 'react-native-svg';

// const size = 200; // Size of the SVG
// const strokeWidth = 20; // Thickness of the circle stroke
// const center = size / 2;
// const radius = (size - strokeWidth) / 2;
// const overallCircumference = 2 * Math.PI * radius;

// const CircularProgress = ({ userActivity, maxActivity }) => {
//   const progress = Math.min(userActivity / maxActivity, 1);
//   const strokeDashoffset = overallCircumference - progress * overallCircumference;

//   return (
//     <View style={styles.container}>
//       <Svg width={size} height={size}>
//         {/* Background circle */}
//         <Circle
//           stroke="#e0e0e0"
//           fill="none"
//           cx={center}
//           cy={center}
//           r={radius}
//           strokeWidth={strokeWidth}
//         />
//         {/* Progress circle */}
//         <Circle
//           stroke="#00bfa5"
//           fill="none"
//           cx={center}
//           cy={center}
//           r={radius}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           strokeDasharray={`${overallCircumference} ${overallCircumference}`}
//           strokeDashoffset={strokeDashoffset}
//           rotation="-90"
//           origin={`${center}, ${center}`}
//         />
//         {/* Text in the center */}
//         <SvgText
//           x={center}
//           y={center}
//           textAnchor="middle"
//           dy="0.3em"
//           fontSize="24"
//           fontWeight="bold"
//           fill="#000"
//         >
//           {userActivity}
//         </SvgText>
//         {/* Subtext below the number */}
//         <SvgText
//           x={center}
//           y={center + 30}
//           textAnchor="middle"
//           dy="0.3em"
//           fontSize="14"
//           fill="#777"
//         >
//           / {maxActivity}
//         </SvgText>
//       </Svg>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default function App() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <CircularProgress userActivity={280} maxActivity={360} />
//     </View>
//   );
// }