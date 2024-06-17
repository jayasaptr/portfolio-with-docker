import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import LoaderOverlay from "@/utils/LoaderOverlay";

const token = Cookies.get("token");

const UpdateSkillPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const handleSkillNameChange = (event) => {
    setSkillName(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSkillImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchDataSkills = async () => {
    //fetch data
    try {
      const response = await api.get(`/api/v1/skills/${id}`);
      setSkillName(response.data.data.name);
      setPreviewImage(response.data.data.image);
      setIsLoading(false);
    } catch (error) {
      console.log("🚀 ~ fetchDataSkills ~ error:", error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //upload file image
    const formData = new FormData();
    formData.append("image", skillImage);
    formData.append("name", skillName);

    setIsLoading(true);

    try {
      const response = await api.put(`/api/v1/skills/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (response.status === 200) {
        toast("Skill has been updated", {
          description: "Skill details have been successfully updated.",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        setIsLoading(false);
        navigate("/dashboard");
      }

      console.log(response);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataSkills();
  }, []);

  return (
    <div className="p-4">
      <LoaderOverlay loading={isLoading} />
      <h2 className="text-lg font-bold mb-4">Update Skill</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Skill Name:</label>
        <input
          type="text"
          value={skillName}
          onChange={handleSkillNameChange}
          className="border p-2 w-full mb-4"
        />
        {previewImage && (
          <img src={previewImage} alt="Preview" className="max-h-14 mb-5" />
        )}
        <label className="block mb-2">Skill Image:</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="border p-2 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Skill
        </button>
      </form>
    </div>
  );
};

export default UpdateSkillPage;
