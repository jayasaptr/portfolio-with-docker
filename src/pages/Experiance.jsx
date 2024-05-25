import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { ScrollToTop } from "../components/ScropToTop";
import Indexim from "../assets/images/indexim.png";
import Tkb from "../assets/images/tkb.png";
import Rectmedia from "../assets/images/rectmedia.png";
const Experiance = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-50 to-gray-200 p-4">
        <VerticalTimeline lineColor="#151515">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Sep 2022 - Jan 2024"
            iconStyle={{
              background: "#fff",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            icon={
              <img
                src={Rectmedia}
                alt="Rectmedia Logo"
                style={{ width: "24px", height: "24px" }}
              />
            }
          >
            <h3 className="vertical-timeline-element-title text-xl font-bold">
              PT.Rectmedia
            </h3>
            <h4 className="vertical-timeline-element-subtitle text-lg font-semibold">
              Freelance - Frontend Developer
            </h4>
            <p className="text-base">
              Firebase, Flutter, Figma, Android Studio, Xcode
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Mei 2023 - Feb 2024"
            iconStyle={{
              background: "#fff",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            icon={
              <img
                src={Tkb}
                alt="Rectmedia Logo"
                style={{ width: "24px", height: "10px" }}
              />
            }
          >
            <h3 className="vertical-timeline-element-title text-xl font-bold">
              PT.Teknologi Kawasan Bahagia
            </h3>
            <h4 className="vertical-timeline-element-subtitle text-lg font-semibold">
              Frontend Developer
            </h4>
            <p className="text-base">
              Flutter, Firebase, Figma, Postman, Android Studio, Xcode
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jan 2022 - Mei 2023"
            iconStyle={{
              background: "#fff",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            icon={
              <img
                src={Indexim}
                alt="Indexim Logo"
                style={{ width: "24px", height: "24px" }}
              />
            }
          >
            <h3 className="vertical-timeline-element-title text-xl font-bold">
              PT. Indexim Coalindo
            </h3>
            <h4 className="vertical-timeline-element-subtitle text-lg font-semibold">
              Fullstack Developer
            </h4>
            <p className="text-base">
              Flutter, Ubuntu, Postmant, Android Studio, Xcode
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Experiance;
