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

const token = Cookies.get("token");

const CreateExperienceSchema = z.object({
  company_name: z.string(),
  position: z.string(),
  location: z.string(),
});

const CreateExperiencePage = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      company_name: "",
      position: "",
      location: "",
    },
    resolver: zodResolver(CreateExperienceSchema),
    reValidateMode: "onSubmit",
  });

  const [skillImage, setSkillImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillsSelect, setSkillsSelect] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const fetchDataSkills = async () => {
    //fetch data
    try {
      const response = await api.get("/api/v1/skills");
      setSkills(response.data.data);
      setIsLoading(false);
      console.log(response.data.data);
    } catch (error) {
      console.log("🚀 ~ fetchDataSkills ~ error:", error);
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

  const handleSubmitExperience = async (data) => {
    const formData = new FormData();

    formData.append("company_name", data.company_name);
    formData.append("position", data.position);
    formData.append("location", data.location);
    formData.append("start_date", format(date.from, "yyyy-MM-dd"));
    formData.append("end_date", format(date.to, "yyyy-MM-dd"));

    if (skillImage) {
      formData.append("image", skillImage);
    }
    skillsSelect.forEach((skillId) => {
      formData.append("skill_ids", skillId.id);
    });

    setLoadingSubmit(true);

    try {
      const response = await api.post("/api/v1/experience", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (response.status === 201) {
        toast("Experience has been created successfully.", {
          description: "You can now view it on your dashboard.",
          status: "success",
        });
        navigate("/dashboard");
      }

      setLoadingSubmit(false);
    } catch (error) {
      console.error("Failed to create experience:", error);
      toast("Failed to create experience.", {
        description: error.message,
        status: "error",
      });

      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    fetchDataSkills();
  }, []);

  return (
    <div className="p-4">
      <LoaderOverlay isLoading={loadingSubmit} />
      <h2 className="text-lg font-bold mb-4">Create New Experience</h2>
      <Form {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(handleSubmitExperience)}
        >
          <FormItem>
            <FormLabel>Date Range</FormLabel>
            <div className={cn("grid gap-2")}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FormItem>
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Company Image:</FormLabel>
            {previewImage && (
              <img src={previewImage} alt="Preview" className="max-h-14 mb-5" />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="border p-2 w-full"
            />
          </FormItem>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
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
                <p>Silahkan input skill terlebih dahulu.</p>
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
          <Button
            onClick={form.handleSubmit(handleSubmitExperience)}
            className="mt-4"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateExperiencePage;
