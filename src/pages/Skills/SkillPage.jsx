import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import api from "../../services/api";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";

const SkillPage = () => {
  const { toast } = useToast();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataSkills = async () => {
    try {
      const response = await api.get("/api/v1/skills?limit=100");
      setSkills(response.data.data || []);
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ fetchDataSkills ~ error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSkills();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    setLoading(true);
    try {
      await api.delete(`/api/v1/skills/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDataSkills();
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: `${error.response.data.message}`,
        description: `${error.response.data.data}`,
      });
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="flex justify-end mb-3">
        <Link
          to="/skills/create"
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-sm text-white font-medium"
        >
          CREATE
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
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
                <Skeleton className="w-10 h-10" />
              </TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
              </TableCell>
            </TableRow>
          ) : skills.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <p className="text-center">Data tidak ada</p>
              </TableCell>
            </TableRow>
          ) : (
            skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell className="font-medium">{skill.name}</TableCell>
                <TableCell>
                  <img
                    src={skill.image}
                    alt={skill.name}
                    style={{ height: "50px" }}
                  />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  <Button
                    onClick={() => handleDelete(skill.id)}
                    className="bg-red-500 hover:bg-red-400 w-10 h-10 text-white rounded-sm p-3"
                  >
                    <FaRegTrashAlt className="h-full w-full" />
                  </Button>
                  <Link
                    to={`/skills/edit/${skill.id}`}
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
export default SkillPage;
