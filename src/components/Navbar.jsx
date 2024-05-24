import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { CiMenuFries } from "react-icons/ci";
import { useState } from "react";

export const Navbar = () => {
  const [isShow, setShow] = useState(false);
  const handleShow = () => {
    setShow(!isShow);
  };
  return (
    <header className="container py-4  shadow-md">
      <div className="flex justify-between items-center ">
        <Link>
          <p className="font-bold font-sans text-2xl hover:cursor-pointer">
            Itechdev
          </p>
        </Link>
        <div className="font-serif">
          <ul className="hidden md:flex gap-4">
            <li>
              <HashLink to="/#portfolio">Portfolio</HashLink>
            </li>
            <li>
              <HashLink to="/#about">About</HashLink>
            </li>
            <li>
              <Link to="/experiance">#Experiance</Link>
            </li>
          </ul>
          <CiMenuFries onClick={handleShow} className="text-3xl md:hidden" />
        </div>
      </div>
      {isShow && (
        <ul className="md:hidden flex flex-col items-center justify-center gap-4 mt-5 ">
          <li>
            <HashLink to="/#portfolio">Portfolio</HashLink>
          </li>
          <li>
            <HashLink to="/#about">About</HashLink>
          </li>
          <li>
            <Link to="/experiance">#Experiance</Link>
          </li>
        </ul>
      )}
    </header>
  );
};
