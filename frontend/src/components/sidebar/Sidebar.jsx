import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

function getWindowDimension() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Sidebar = () => {
  const [windowDimension, setWindowDimension] = useState(getWindowDimension());
  const { selectedConversation } = useConversation();

  useEffect(() => {
    function handleResize() {
      setWindowDimension(getWindowDimension());
    }

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`border-r border-slate-500 p-4 flex flex-col ${
        selectedConversation !== null && windowDimension.width < 640
          ? "hidden"
          : ""
      }`}
    >
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
