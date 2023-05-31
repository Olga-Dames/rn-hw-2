import { SvgXml } from "react-native-svg";

const UserIcon = () => {
  const svgUser = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
  <path stroke="#212121" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".8" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
  <path stroke="#212121" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".8" d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" clip-rule="evenodd"/>
</svg>`

  return (
    <SvgXml
      xml={svgUser}
      width={24}
      height={24}
    />
  );
};

export default UserIcon;