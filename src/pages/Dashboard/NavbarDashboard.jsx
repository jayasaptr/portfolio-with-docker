import { RxHamburgerMenu } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { Button } from "@/components/ui/button";
const NavbarDashboard = () => {
  return (
    <div className=" flex justify-between py-2 pr-4 border-b-2">
      <Button variant="ghost">
        <RxHamburgerMenu className="h-full w-full" />
      </Button>
      <Button variant="ghost">
        <MdLogout className="h-full w-full" />
      </Button>
    </div>
  );
};

export default NavbarDashboard;
