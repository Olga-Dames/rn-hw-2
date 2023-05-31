import { SvgXml } from "react-native-svg";

const ExitIcon = () => {
  const svgExit = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
  <path stroke="#BDBDBD" stroke-linecap="round" stroke-linejoin="round" d="M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5M17 16l4-4-4-4M21 12H9"/>
</svg>`

  return (
    <SvgXml
      xml={svgExit}
      width={24}
      height={24}
    //   style={{
    //     position: "absolute",
    //     bottom: 14,
    //     right: -12,
    //     borderWidth: 1,
    //     borderColor: "#000",
    //   }}
    />
  );
};

export default ExitIcon;