"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { API_URL } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email.")
    .refine(async (e) => {
      // Where checkIfEmailIsValid makes a request to the backend
      // to see if the email is valid.
      // return await checkIfEmailIsValid(e);
      return true;
    }, "This email is not in our database"),
  password: z.string().min(4, "Password must be at least 4 charactres"),
});

export const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const loginMutation = useMutation(
    async (body: z.infer<typeof formSchema>) => {
      return (
        await fetch(API_URL + "user", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
      ).json();
    }
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values, {
      onSuccess(data) {
        if(!data.token){
            toast({
                variant: "destructive",
                title: "Failure!!!",
                description: "Invalid Credentials",
              });
            return 
        }
        toast({
          variant: "default",
          title: "Success!!!",
          description: "Logged in Successfully",
        });
        localStorage.setItem("auth_token", "Bearer " + data.token);
        router.push("/chat");
      },
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter below details to login</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@gmail.com" {...field} />
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loginMutation.isLoading}>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
