import { RxHamburgerMenu } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
const NavbarDashboard = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const logout = () => {
    //remove token and user on cookies
    Cookies.remove("token");
    Cookies.remove("user");

    //assign false to state "isAuthenticated"
    setIsAuthenticated(false);

    // redirect to login
    navigate("/login", { replace: true });
  };
  return (
    <div className=" flex justify-between py-2 pr-4 border-b-2">
      <Button variant="ghost">
        <RxHamburgerMenu className="h-full w-full" />
      </Button>
      <Button onClick={logout} variant="ghost">
        <MdLogout className="h-full w-full" />
      </Button>
    </div>
  );
};

export default NavbarDashboard;
