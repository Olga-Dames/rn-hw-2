import { SvgXml } from "react-native-svg";

const PlusIcon = () => {
  const svgPlus = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none">
  <path fill="#fff" fill-rule="evenodd" d="M7.5.5h-1v6h-6v1h6v6h1v-6h6v-1h-6v-6Z" clip-rule="evenodd"/>
</svg>`;

  return <SvgXml xml={svgPlus} width={13} height={13} />;
};

export default PlusIcon;