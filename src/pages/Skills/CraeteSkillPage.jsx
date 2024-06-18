import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

const token = Cookies.get("token");

const CreateSkillPage = () => {
  const navigate = useNavigate();
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    //upload file image
    const formData = new FormData();
    formData.append("image", skillImage);
    formData.append("name", skillName);

    try {
      const response = await api.post("/api/v1/skills", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        navigate("/dashboard");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Create New Skill</h2>
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
          Create Skill
        </button>
      </form>
    </div>
  );
};

export default CreateSkillPage;
