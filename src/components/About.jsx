import { useEffect } from "react";
import { useState } from "react";
import api from "@/services/api";

export const About = () => {
  const [skills, setSkills] = useState([]);
  const fetchSkills = async () => {
    try {
      const response = await api.get("/api/v1/skills?limit=100");
      setSkills(response.data.data);
    } catch (error) {
      console.log("🚀 ~ fetchSkills ~ error:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

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
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-2">
              <img
                src={skill.image}
                alt={skill.name}
                className="h-8 hover:scale-x-105 duration-300 transition-all brightness-50 hover:brightness-100 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
