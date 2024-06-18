import { useParams } from "react-router-dom";
import SharpImage from "../assets/images/sharp.png";
import { FiClock } from "react-icons/fi";
import { ScrollToTop } from "@/components/ScropToTop";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

const DetailPortfolio = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/v1/portfolio/${id}`);
      setPortfolio(response.data.data.portfolio);
    } catch (error) {
      console.error("🚀 ~ fetchPortfolio ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-10 mx-8">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <>
      <div className="py-10 mx-8">
        <div className="flex items-center gap-4">
          <h1 className="text-base font-serif uppercase">
            {portfolio.experience?.company_name || ""}
          </h1>
          <hr className="w-10 bg-black border-0 h-px" />
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
          <h2 className="font-mono font-bold text-4xl">{portfolio.title}</h2>
          <p className="font-serif">{portfolio.subtitle}</p>
        </div>
        <div className="flex gap-2 items-center mt-6">
          <FiClock />
          <p>
            {new Date(portfolio.date_project).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="shadow-lg rounded-lg overflow-hidden mt-10">
          <img
            src={portfolio.image}
            alt={portfolio.title}
            className="w-full scale-105"
          />
        </div>
        {/* Content */}
        <div className="font-serif mt-10 mx-auto lg:w-2/3 md:w-3/4 sm:w-full">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl">
            <div dangerouslySetInnerHTML={{ __html: portfolio.content }} />
          </p>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
};

export default DetailPortfolio;
