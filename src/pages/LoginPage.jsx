import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
import axios from "axios";

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

  const [isChecked, setIsChecked] = useState(false);
  const handleLogin = async (data) => {
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
      //   data
      // );
      console.log("🚀 ~ handleLogin ~ response:", response);
    } catch (error) {
      console.error("🚀 ~ handleLogin ~ error:", error);
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
                    <FormDescription>
                      Password must be at least 8 characters
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
