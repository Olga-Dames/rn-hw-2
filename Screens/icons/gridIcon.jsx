import { SvgXml } from "react-native-svg";

const GridIcon = () => {
  const svgGrid= `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
  <path fill="#fff" d="M0 0h24v24H0z"/>
  <path stroke="#212121" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".8" d="M3 3h7v7H3V3ZM14 3h7v7h-7V3ZM14 14h7v7h-7v-7ZM3 14h7v7H3v-7Z" clip-rule="evenodd"/>
</svg>`

  return (
    <SvgXml
      xml={svgGrid}
      width={24}
      height={24}
    />
  );
};

export default GridIcon;