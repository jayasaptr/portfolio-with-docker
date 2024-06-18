import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import Cookies from "js-cookie";

const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataPortfolios = async () => {
    try {
      const response = await api.get("api/v1/portfolio");
      setPortfolios(response.data.data.portfolios || []);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ fetchDataPortfolios ~ error:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (portfolioId) => {
    const token = Cookies.get("token");
    try {
      const response = await api.delete(`api/v1/portfolio/${portfolioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setPortfolios(
          portfolios.filter((portfolio) => portfolio.id !== portfolioId)
        );
        console.log("Portfolio deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
    }
  };

  useEffect(() => {
    fetchDataPortfolios();
  }, []);

  return (
    <>
      <div className="flex justify-end mb-3">
        <Link
          to="/portfolio/create"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-sm text-white font-medium"
        >
          CREATE
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Subtitle</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Date Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell>
                <Skeleton className="w-14 h-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-14 h-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-10 h-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-14 h-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-14 h-10" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-14 h-10" />
              </TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
              </TableCell>
            </TableRow>
          ) : portfolios.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24">
                No data
              </TableCell>
            </TableRow>
          ) : (
            portfolios.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.subtitle}</TableCell>
                <TableCell>
                  <img src={item.image} alt={item.title} className="h-10 " />
                </TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>
                  {new Date(item.date_project).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-400 w-10 h-10 text-white rounded-sm p-3"
                  >
                    <FaRegTrashAlt className="h-full w-full" />
                  </Button>
                  <Link
                    to={`/portfolio/edit/${item.id}`}
                    className="bg-green-500 hover:bg-green-400 w-10 h-10 text-white rounded-sm p-3"
                  >
                    <MdModeEditOutline className="h-full w-full" />
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default PortfolioPage;
