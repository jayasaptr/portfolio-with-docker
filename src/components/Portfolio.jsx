import { useState } from "react";
import { Card } from "./Card";
import api from "../services/api";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
export const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPortfolio = async () => {
    try {
      const response = await api.get("/api/v1/portfolio");
      console.log(response.data.data.portfolios);
      setPortfolios(response.data.data.portfolios || []);
    } catch (error) {
      console.log("🚀 ~ fetchPortfolio ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <section id="portfolio" className="py-10">
      <div className="flex justify-center flex-col items-center gap-8 mx-8">
        <h1 className="text-2xl font-sans uppercase hover:underline leading-4">
          Portfolio
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full gap-6">
          {isLoading ? (
            <>
              <Skeleton className="w-full max-w-sm h-44" />
              <Skeleton className="w-full max-w-sm h-44" />
              <Skeleton className="w-full max-w-sm h-44" />
            </>
          ) : (
            portfolios.map((portfolio) => <Card portfolio={portfolio} />)
          )}
        </div>
      </div>
    </section>
  );
};
