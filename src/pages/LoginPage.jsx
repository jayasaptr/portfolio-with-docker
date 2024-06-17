import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormItem,
  FormMessage,
  FormLabel,
  FormField,
  FormControl,
  FormDescription,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Cookies from "js-cookie";

//validasi input login
const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "your password needs to be at least 8 character or more"),
});

const LoginPage = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
    reValidateMode: "onSubmit",
  });

  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState([]);

  const [isChecked, setIsChecked] = useState(false);
  const handleLogin = async (data) => {
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      await api.post("api/v1/auth/login", formData).then((response) => {
        Cookies.set("token", response.data.data.token);
        Cookies.set("user", response.data.data);
        setIsAuthenticated(true);
        navigate("/dashboard", { replace: true });
      });
    } catch (error) {
      setLoginFailed(error.response.data.data);
    }
  };

  return (
    <main className="container max-w-screen-md py-8 flex flex-col justify-center items-center h-screen">
      <Form {...form}>
        <form
          className="w-full max-w-[540px]"
          onSubmit={form.handleSubmit(handleLogin)}
        >
          <Card>
            <CardHeader>Selamat Datang!</CardHeader>
            <CardContent className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={isChecked ? "text" : "password"}
                      />
                    </FormControl>
                    <FormDescription className="text-red-500">
                      {loginFailed ?? ""}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  onCheckedChange={(checked) => setIsChecked(checked)}
                  id="show-password"
                />
                <Label htmlFor="show-password">Show Password</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default LoginPage;
