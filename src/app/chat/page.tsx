"use client";
import { Sidebar } from "@/components/views/Sidebar/Sidebar";
import { useAuth } from "@/lib/hooks/useAuth";
import { useSocketHandler } from "@/lib/hooks/useSocketHandler";
import { NextPage } from "next";


export const ChatPage: NextPage = () => {
  useAuth();
  useSocketHandler()
  return (
    <div className="h-screen max-h-screen w-screen max-w-screen flex gap-2">
      <Sidebar />
      <div className="h-full w-full bg-primary-foreground flex flex-col gap-5 max-md:hidden">
        <div className="w-full h-full rounded-lg flex items-center justify-center">
          <h1 className="text-2xl">Start a new chat!</h1>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
