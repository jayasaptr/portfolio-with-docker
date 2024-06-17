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
import { useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CreatePortfolioSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  status: z.string(),
});

const CreatePortfolioPage = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      status: "",
    },
    resolver: zodResolver(CreatePortfolioSchema),
    reValidateMode: "onSubmit",
  });

  const [skillImage, setSkillImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [dataContent, setDataContent] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillsSelect, setSkillsSelect] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [date, setDate] = useState();

  const fetchDataSkills = async () => {
    try {
      const response = await api.get("/api/v1/skills");
      setSkills(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setIsLoading(false);
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
    formData.append("image", skillImage);
    skillsSelect.forEach((skillId) => {
      formData.append("skill_ids", skillId.id);
    });

    setLoadingSubmit(true);

    const token = Cookies.get("token");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await api.post("/api/v1/portfolio", formData);
      if (response.status === 200) {
        toast("Portfolio created successfully.", {
          description: "You can now view it on your dashboard.",
          status: "success",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Failed to create portfolio:", error);
      toast("Failed to create portfolio.", {
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
  }, []);

  return (
    <div className="p-4">
      <LoaderOverlay isLoading={loadingSubmit} />
      <h2 className="text-lg font-bold mb-4">Create New Portfolio</h2>
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
                data="<p>Hello from CKEditor&nbsp;5!</p>"
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
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePortfolioPage;
