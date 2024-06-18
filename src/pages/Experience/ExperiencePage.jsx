import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const ExpereincePage = () => {
  const { toast } = useToast();
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataExperience = async () => {
    try {
      const response = await api.get("api/v1/experience");
      setExperience(response.data.data.experience || []);
      console.log(response.data.data.experience);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ fetchDataExperience ~ error:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log("🚀 ~ handleDelete ~ id:", id);
    setLoading(true);
    try {
      await api.delete(`/api/v1/experience/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDataExperience();
    } catch (error) {
      setLoading(false);
      // toast({
      //   variant: "destructive",
      //   title: `${error.response.data.message}`,
      //   description: `${error.response.data.data}`,
      // });
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchDataExperience();
  }, []);

  return (
    <>
      <div className="flex justify-end mb-3">
        <Link
          to="/experience/create"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-sm text-white font-medium"
        >
          CREATE
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Location</TableHead>
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
          ) : experience.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24">
                No data
              </TableCell>
            </TableRow>
          ) : (
            experience.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.company_name}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.company_name}
                    className="h-10 "
                  />
                </TableCell>
                <TableCell>
                  {new Date(item.start_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(item.end_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-400 w-10 h-10 text-white rounded-sm p-3"
                  >
                    <FaRegTrashAlt className="h-full w-full" />
                  </Button>
                  <Link
                    to={`/experience/edit/${item.id}`}
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
export default ExpereincePage;
