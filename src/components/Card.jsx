import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { RiMapPinLine } from "react-icons/ri";
import LogoSharp from "../assets/images/logo_sharp.png";
export const Card = () => {
  return (
    <>
      <div className="border-slate-800 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] shadow-slate-800 border-2 p-2 hover:scale-105 transition-transform duration-300">
        <div className="flex gap-10 justify-between">
          <div className="flex gap-3 items-center">
            <div className="h-14 w-16 md:14 bg-red-400 rounded-md ">
              <img
                src={LogoSharp}
                alt="Logo Sharp"
                className="min-w-full min-h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold font-sans">Sharp Diamond</h3>
              <p className="font-serif">PT. Teknologi Kawasan Bahagia</p>
            </div>
          </div>
          <FiArrowUpRight className="text-3xl" />
        </div>
        <hr className="w-full border-t-1 border-gray-300 my-5" />
        <h3>Sharp Diamond</h3>
        <div className="flex gap-2 items-center">
          <FiClock />
          <p>April 2022</p>
        </div>
        <div className="flex justify-between mt-5 items-center">
          <div className="p-2 bg-yellow-100 ">
            <p className="text-yellow-500 font-sans">Onsite</p>
          </div>
          <div className="flex gap-2 items-center">
            <RiMapPinLine />
            <p>Jakarta</p>
          </div>
        </div>
      </div>
    </>
  );
};
