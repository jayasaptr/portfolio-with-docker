import ExpereincePage from "../Experience/ExperiencePage";
import PortfolioPage from "../Portfolio/PortfolioPage";
import SkillPage from "../Skills/SkillPage";

const Content = ({ content }) => {
  return (
    <div className="p-4 overflow-y-auto">
      {content === "Skills" && <SkillPage />}
      {content === "Experience" && <ExpereincePage />}
      {content === "Portfolio" && <PortfolioPage />}
    </div>
  );
};

export default Content;
