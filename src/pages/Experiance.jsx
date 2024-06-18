import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { ScrollToTop } from "../components/ScropToTop";
import api from "@/services/api";
import { useState, useEffect } from "react";
const Experiance = () => {
  const [experiences, setExperiences] = useState([]);
  const fetchExperiences = async () => {
    try {
      const response = await api.get("/api/v1/experience");
      setExperiences(response.data.data.experience);
    } catch (error) {
      console.log("🚀 ~ fetchExperiences ~ error:", error);
    }
  };
  useEffect(() => {
    fetchExperiences();
  }, []);
  return (
    <>
      <div className="bg-gradient-to-r from-gray-50 to-gray-200 p-4">
        <VerticalTimeline lineColor="#151515">
          {experiences.map((exp) => (
            <VerticalTimelineElement
              key={exp.id}
              className="vertical-timeline-element--work"
              date={`${new Date(exp.start_date).toLocaleString("en-US", {
                month: "short",
                year: "numeric",
              })} - ${new Date(exp.end_date).toLocaleString("en-US", {
                month: "short",
                year: "numeric",
              })}`}
              iconStyle={{
                background: "#fff",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              icon={
                <img
                  src={exp.image}
                  alt={`${exp.company_name} Logo`}
                  style={{
                    height: "20px",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              }
            >
              <h3 className="vertical-timeline-element-title text-xl font-bold">
                {exp.company_name}
              </h3>
              <h4 className="vertical-timeline-element-subtitle text-lg font-semibold">
                {exp.position}
              </h4>
              <p className="text-base">
                {exp.skills.map((skill, index) => (
                  <span key={skill}>
                    {skill.name}
                    {index < exp.skills.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Experiance;
