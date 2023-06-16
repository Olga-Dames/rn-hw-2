// import { SvgXml } from "react-native-svg";

// const ExitIcon = () => {
//   const svgExit = `
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
//   <path stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round" d="M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5M17 16l4-4-4-4M21 12H9"/>
// </svg>`

//   return (
//     <SvgXml
//       xml={svgExit}
//       width={24}
//       height={24}
//     //   style={{
//     //     position: "absolute",
//     //     bottom: 14,
//     //     right: -12,
//     //     borderWidth: 1,
//     //     borderColor: "#000",
//     //   }}
//     />
//   );
// };

// export default ExitIcon;

import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';

export default function ExitIcon() {
  return (
    <Svg
      style={styles.LogOut}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10"
        stroke="#BDBDBD"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17 16L21 12L17 8"
        stroke="#BDBDBD"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21 12H9"
        stroke="#BDBDBD"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  LogOut: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});