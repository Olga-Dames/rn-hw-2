import { SvgXml } from "react-native-svg";

const AddAvatarIcon = () => {
  const svgAdd = `
    <svg xmlns="http://www.w3.org/2000/svg" 
    width="25" height="25" fill="none">
    <circle cx="12.5" cy="12.5" r="12" fill="#fff" stroke="#FF6C00"/>
    <path fill="#FF6C00" fill-rule="evenodd" d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6Z" clip-rule="evenodd"/></svg>`;

  return (
    <SvgXml
      xml={svgAdd}
      width={25}
      height={25}
    />
  );
};

export default AddAvatarIcon;


