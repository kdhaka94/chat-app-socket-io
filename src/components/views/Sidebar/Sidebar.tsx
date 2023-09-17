"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { API_URL } from "@/lib/constants";
import { useQuery } from "react-query";
import { UserChat } from "../UserChat/UserChat";
import { Separator } from "@/components/ui/separator";

export const Sidebar = () => {
  const { data, isLoading } = useQuery("users", async () => {
    return (
      await fetch(API_URL + "user/get_users", {
        method: "POST",
        "Content-Type": "application/json",
        headers: {
          authorization: localStorage.getItem("auth_token"),
        },
      })
    ).json();
  });
  return (
    <div className="flex flex-col w-96 bg-primary h-full max-md:w-full">
      {data?.users?.map((user: any) => (
        <div key={user?._id}>
          <UserChat user={user} />
          <Separator className="bg-primary-foreground" />
        </div>
      ))}
    </div>
  );
};
