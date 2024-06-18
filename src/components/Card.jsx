import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { RiMapPinLine } from "react-icons/ri";
import LogoSharp from "../assets/images/logo_sharp.png";
import { Link } from "react-router-dom";
export const Card = ({ portfolio }) => {
  return (
    <Link to={`detail-portfolio/${portfolio.id}`}>
      <div className="border-slate-800 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] shadow-slate-800 border-2 p-2 hover:scale-105 transition-transform duration-300 h-full flex flex-col justify-between">
        <div>
          <div className="flex gap-10 justify-between">
            <div className="flex gap-3 items-center">
              <div className="h-14 w-16 md:14 bg-red-400 rounded-md ">
                <img
                  src={portfolio.image}
                  alt={portfolio.name}
                  className="min-w-full min-h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-semibold font-sans">{portfolio.title}</h3>
                <p className="font-serif">
                  {portfolio.experience.company_name}
                </p>
              </div>
            </div>
            <FiArrowUpRight className="text-3xl" />
          </div>
          <hr className="w-full border-t-1 border-gray-300 my-5" />
          <h3>{portfolio.title}</h3>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <FiClock />
            <p>
              {new Date(portfolio.date_project).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex justify-between mt-5 items-center">
            <div className="p-2 bg-yellow-100 ">
              <p className="text-yellow-500 font-sans">{portfolio.status}</p>
            </div>
            <div className="flex gap-2 items-center">
              <RiMapPinLine />
              <p>{portfolio.experience.location}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
