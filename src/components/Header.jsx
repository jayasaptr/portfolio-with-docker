import { Link } from "react-router-dom";
import profilePicture from "../assets/images/jaya.png";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export const Header = () => {
  return (
    <>
      <div className="bg-yellow-400 md:h-[60vh]  lg:h-[80vh] p-8 m-8 rounded-sm flex flex-col justify-center gap-8 relative border-slate-800 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] shadow-slate-800 border-2 mx-8">
        <div className="md:absolute md:top-0 md:left-0 ml-4 mt-4 gap-2 md:flex flex-col hidden">
          <div className="w-40 h-1 bg-black "></div>
          <div className="w-20 h-1 bg-black "></div>
        </div>
        <div className="flex justify-center">
          <img
            src={profilePicture}
            alt="profile"
            className="rounded-full border-yellow-300 border-8 w-40 h-40"
          />
        </div>
        <div className="text-center flex flex-col gap-2">
          <h3 className="font-bold font-serif text-2xl md:text-3xl lg:text-5xl">
            Muhammad Jaya Saputra
          </h3>
          <p className="text-xl md:text-2xl lg:text-3xl">
            Frontend Developer - Backend Developer - Mobile Developer
          </p>
        </div>
        <div className="lg:absolute lg:bottom-0 lg:right-0 mb-4 md:mr-8">
          <div className="flex gap-6 justify-center">
            <Link
              to="https://github.com/jayasaptr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-2xl md:text-3xl lg:text-4xl" />
            </Link>
            <Link
              to="https://instagram.com/jaya.saptr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl md:text-3xl lg:text-4xl" />
            </Link>
            <Link
              to="https://www.linkedin.com/in/muhammad-jaya-saputra-s-kom-829b68231/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-2xl md:text-3xl lg:text-4xl" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
