import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import api from "@/services/api";
import { IoIosClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoaderOverlay from "@/utils/LoaderOverlay";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import exp from "constants";

const UpdatePortfolioSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  status: z.string(),
});

const UpdatePortfolioPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const form = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      status: "",
    },
    resolver: zodResolver(UpdatePortfolioSchema),
    reValidateMode: "onSubmit",
  });

  const [skillImage, setSkillImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [dataContent, setDataContent] = useState("");
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skillsSelect, setSkillsSelect] = useState([]);
  const [experienceSelect, setExperienceSelect] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [date, setDate] = useState();

  const fetchDataSkills = async () => {
    try {
      const response = await api.get("/api/v1/skills?limit=100");
      setSkills(response.data.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setIsLoading(false);
    }
  };

  const fetchExperiences = async () => {
    try {
      const response = await api.get("/api/v1/experience");
      console.log("🚀 ~ fetchExperiences ~ response", response);
      setExperiences(response.data.data.experience || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      setIsLoading(false);
    }
  };

  const fetchPortfolioData = async () => {
    try {
      const response = await api.get(`/api/v1/portfolio/${id}`);
      const portfolio = response.data.data.portfolio;
      console.log(
        "🚀 ~ fetchPortfolioData ~ data:",
        response.data.data.portfolio
      );
      form.setValue("title", portfolio.title);
      form.setValue("subtitle", portfolio.subtitle);
      form.setValue("status", portfolio.status);
      setDataContent(portfolio.content);
      setDate(new Date(portfolio.date_project));
      setSkillsSelect(portfolio.skills || []);
      setExperienceSelect(portfolio.experience.id || "");
      setPreviewImage(portfolio.image);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
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

  const handleSubmitPortfolio = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("content", dataContent);
    formData.append("status", data.status);
    formData.append("date_project", format(date, "yyyy-MM-dd"));
    formData.append("experience_id", experienceSelect);
    if (skillImage) {
      formData.append("image", skillImage);
    }
    skillsSelect.forEach((skillId) => {
      formData.append("skill_ids", skillId.id);
    });

    setLoadingSubmit(true);

    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await api.put(`/api/v1/portfolio/${id}`, formData);
      if (response.status === 200) {
        toast("Portfolio updated successfully.", {
          description: "You can now view it on your dashboard.",
          status: "success",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Failed to update portfolio:", error);
      toast("Failed to update portfolio.", {
        description: error.message,
        status: "error",
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
    fetchDataSkills();
    fetchExperiences();
    fetchPortfolioData();
  }, []);

  return (
    <div className="p-4">
      <LoaderOverlay isLoading={loadingSubmit} />
      <h2 className="text-lg font-bold mb-4">Update Portfolio</h2>
      <Form {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(handleSubmitPortfolio)}
        >
          <FormItem className="flex flex-col">
            <FormLabel>Date Project</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Image:</FormLabel>
            {previewImage && (
              <img src={previewImage} alt="Preview" className="max-h-14 mb-5" />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="border p-2 w-full"
            />
          </FormItem>
          <FormItem>
            <FormLabel>Content</FormLabel>
            <div>
              <CKEditor
                editor={ClassicEditor}
                data={dataContent}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDataContent(data);
                }}
              />
            </div>
          </FormItem>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Skills</FormLabel>
            <div className="flex flex-row gap-2">
              {skillsSelect.map((skill, index) => (
                <Button
                  key={skill.id}
                  className="flex flex-row gap-2"
                  variant="outline"
                  onClick={() => {
                    const updatedSkills = skillsSelect.filter(
                      (_, idx) => idx !== index
                    );
                    setSkillsSelect(updatedSkills);
                  }}
                >
                  <p>{skill.name}</p>
                  <IoIosClose />
                </Button>
              ))}
              {isLoading ? (
                <p>Loading...</p>
              ) : skills.length === 0 ? (
                <p>Please input skills first.</p>
              ) : (
                <Select
                  onValueChange={(value) => {
                    const selectedSkill = skills.find(
                      (skill) => skill.id === value
                    );
                    if (
                      selectedSkill &&
                      !skillsSelect.some((s) => s.id === selectedSkill.id)
                    ) {
                      setSkillsSelect([...skillsSelect, selectedSkill]);
                    }
                  }}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Add Skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {skills.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </FormItem>
          <FormItem>
            <FormLabel>Experience</FormLabel>
            <Select
              value={experienceSelect ? experienceSelect : experienceSelect.id}
              onValueChange={(value) => {
                const selectedExperience = experiences.find(
                  (experience) => experience.id === value
                );
                if (selectedExperience) {
                  console.log("🚀 ~ selectedExperience", selectedExperience.id);
                  setExperienceSelect(selectedExperience.id);
                }
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {experiences.map((experience) => (
                    <SelectItem key={experience.id} value={experience.id}>
                      {experience.company_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePortfolioPage;
