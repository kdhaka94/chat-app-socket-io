"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChatHeader } from "@/components/views/ChatHeader/ChatHeader";
import { Messages } from "@/components/views/Messages/Messages";
import { Sidebar } from "@/components/views/Sidebar/Sidebar";
import { API_URL } from "@/lib/constants";
import { useAuth } from "@/lib/hooks/useAuth";
import { useSocketHandler } from "@/lib/hooks/useSocketHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as z from "zod";

const formSchema = z.object({
  message: z.string().min(1, { message: "Please enter a message" }),
});

export const ChatPage: NextPage = ({ params }) => {
  const sendMessageMutation = useMutation(
    async (body: { message: string; to: string }) => {
      return (
        await fetch(API_URL + "chat/message", {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: localStorage.getItem("auth_token"),
          },
        })
      ).json();
    }
  );
  useAuth();
  useSocketHandler();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    sendMessageMutation.mutate(
      { message: values.message, to: params.id },
      {
        onSuccess(data, variables, context) {
          form.reset();
          const elem = document.querySelector("#scroll-area");
          elem?.scrollTo({
            top: elem?.scrollHeight,
            behavior: "smooth",
          });
        },
        onError(error, variables, context) {
          console.log({ error });
        },
      }
    );
  }
  return (
    <div className="h-screen max-h-screen w-screen max-w-screen flex">
      <div className="max-md:hidden h-screen">
        <Sidebar />
      </div>
      <div className="h-full w-full bg-primary-foreground flex flex-col gap-5">
        <ChatHeader params={params} />
        <Messages id={params.id} />
        <div className="w-full pb-2 px-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex items-baseline gap-5"
            >
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input placeholder="Message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={sendMessageMutation.isLoading}>
                Send
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
