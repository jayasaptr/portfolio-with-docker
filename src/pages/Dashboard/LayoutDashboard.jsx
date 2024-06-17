import { useState } from "react";
import Content from "./Content";
import NavbarDashboard from "./NavbarDashboard";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import CraeteSkillPage from "../Skills/CraeteSkillPage";
import UpdateSkillPage from "../Skills/UpdateSkillPage";
import CreateExperiencePage from "../Experience/CreateExperiencePage";
import UpdateExperiencePage from "../Experience/UpdateExperiencePage";
import CreatePortfolioPage from "../Portfolio/CreatePortfolioPage";
import UpdatePortfolioPage from "../Portfolio/UpdatePortfolioPage";

const LayoutDashboard = () => {
  const location = useLocation();
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

  // if (location.pathname === "/skills/create") {
  //   return <CraeteSkillPage />;
  // }

  const handelSelect = (item) => {
    console.log("🚀 ~ handelSelect ~ item:", item.label);

    setContent(item.label);
  };

  return (
    <main className="flex h-screen">
      <Sidebar items={sidebarItems} onSelect={handelSelect} />
      <div className="flex flex-col w-full">
        <NavbarDashboard />
        <div className="overflow-y-auto">
          {location.pathname === "/skills/create" ? (
            <CraeteSkillPage />
          ) : location.pathname.startsWith("/skills/edit") ? (
            <UpdateSkillPage />
          ) : location.pathname === "/experience/create" ? (
            <CreateExperiencePage />
          ) : location.pathname.startsWith("/experience/edit") ? (
            <UpdateExperiencePage />
          ) : location.pathname === "/portfolio/create" ? (
            <CreatePortfolioPage />
          ) : location.pathname.startsWith("/portfolio/edit") ? (
            <UpdatePortfolioPage />
          ) : (
            <Content content={content} />
          )}
        </div>
      </div>
    </main>
  );
};

export default LayoutDashboard;
