import {
  FaPhp,
  FaReact,
  FaLinux,
  FaDocker,
  FaAppStoreIos,
  FaLaravel,
  FaGitAlt,
} from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiPostgresql,
  SiMysql,
  SiFlutter,
  SiAndroidstudio,
  SiFirebase,
  SiTailwindcss,
} from "react-icons/si";
export const About = () => {
  return (
    <section id="about" className="py-10">
      <div className="flex justify-center flex-col items-center gap-8 mx-8">
        <h1 className="text-2xl font-sans uppercase hover:underline leading-4">
          About ME
        </h1>

        <div className="text-center text-lg font-light text-gray-600 leading-relaxed  max-w-prose flex gap-3 flex-col">
          <p>
            Halo! Saya adalah seorang pengembang perangkat lunak serba bisa
            dengan keahlian dalam Frontend Development, Backend Development, dan
            Mobile Development.
          </p>
          <p>
            Dengan kombinasi pengetahuan dan pengalaman dalam berbagai aspek
            pengembangan perangkat lunak, saya siap untuk menghadapi tantangan
            baru dan memberikan solusi teknologi yang inovatif. Mari kita
            ciptakan masa depan teknologi yang lebih baik bersama-sama!
          </p>
        </div>
        <h3 className="font-sans font-semibold text-2xl text-center">
          Programming Language & Tools
        </h3>
        <div className="flex gap-4 flex-wrap justify-center text-3xl md:text-5xl max-w-[600px]">
          <FaGolang className="hover:text-blue-500 transition-colors duration-300 hover:scale-105" />
          <IoLogoJavascript className="hover:text-yellow-500 transition-colors duration-300 hover:scale-105" />
          <FaPhp className="hover:text-purple-500 transition-colors duration-300 hover:scale-105" />
          <SiPostgresql className="hover:text-blue-700 transition-colors duration-300 hover:scale-105" />
          <SiMysql className="hover:text-blue-800 transition-colors duration-300 hover:scale-105" />
          <FaReact className="hover:text-cyan-500 transition-colors duration-300 hover:scale-105" />
          <SiFlutter className="hover:text-blue-400 transition-colors duration-300 hover:scale-105" />
          <FaLinux className="hover:text-black transition-colors duration-300 hover:scale-105" />
          <FaDocker className="hover:text-blue-300 transition-colors duration-300 hover:scale-105" />
          <SiAndroidstudio className="hover:text-green-600 transition-colors duration-300 hover:scale-105" />
          <FaAppStoreIos className="hover:text-gray-800 transition-colors duration-300 hover:scale-105" />
          <SiFirebase className="hover:text-yellow-600 transition-colors duration-300 hover:scale-105" />
          <SiTailwindcss className="hover:text-teal-400 transition-colors duration-300 hover:scale-105" />
          <FaLaravel className="hover:text-red-500 transition-colors duration-300 hover:scale-105" />
          <FaGitAlt className="hover:text-orange-500 transition-colors duration-300 hover:scale-105" />
        </div>
      </div>
    </section>
  );
};
