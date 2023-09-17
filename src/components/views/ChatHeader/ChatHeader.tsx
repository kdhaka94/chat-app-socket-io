"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

export const ChatHeader = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const { data } = useQuery(`user-${id}`, async () => {
    return (
      await fetch(API_URL + `user/get/${id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("auth_token"),
        },
      })
    ).json();
  });
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/");
  };
  return (
    <div className="w-full p-5 bg-primary/90 flex items-center text-primary-foreground justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="text-primary">
          <AvatarFallback>
            {data?.name?.slice(0, 2)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span>{data?.name}</span>
        {data?.online ? (
          <Badge variant="secondary">Online</Badge>
        ) : (
          <Badge variant="destructive">Offline</Badge>
        )}
      </div>
      <Button variant="secondary" onClick={() => handleLogout()}>
        Logout
      </Button>
    </div>
  );
};
