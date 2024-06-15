import { useState } from "react";
import Content from "./Content";
import NavbarDashboard from "./NavbarDashboard";
import Sidebar from "./Sidebar";

const LayoutDashboard = () => {
  const [content, setContent] = useState({
    label: "Skills",
  });
  const sidebarItems = [
    {
      label: "Skills",
    },
    {
      label: "Experience",
    },
    {
      label: "Portfolio",
    },
  ];
  const handelSelect = (item) => {
    console.log("🚀 ~ handelSelect ~ item:", item.label);

    setContent(item.label);
  };

  return (
    <main className="flex h-screen">
      <Sidebar items={sidebarItems} onSelect={handelSelect} />
      <div className="flex flex-col w-full">
        <NavbarDashboard />
        <Content content={content} />
      </div>
    </main>
  );
};

export default LayoutDashboard;
