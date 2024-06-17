import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Sidebar = ({ items, onSelect }) => {
  return (
    <aside className="w-64 h-screen py-4 flex flex-col gap-5 border-r-2">
      <h3 className="font-bold text-lg text-center">Portfolio Project</h3>
      <Link to="/dashboard" className="flex flex-col">
        {items.map((item, index) => (
          <Button
            key={index}
            onClick={() => onSelect(item)}
            className="w-full rounded-none justify-start py-8"
            variant="ghost"
          >
            {item.label}
          </Button>
        ))}
      </Link>
    </aside>
  );
};

export default Sidebar;
