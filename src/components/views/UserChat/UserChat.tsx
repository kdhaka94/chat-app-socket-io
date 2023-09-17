"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const UserChat = ({ user }: { user: any }) => {
  return (
    <Link href={`/chat/${user._id}`}>
      <div className="flex gap-5 px-2 cursor-pointer hover:bg-primary-foreground/10 py-5">
        <Avatar>
          <AvatarFallback>
            {user?.name?.slice(0, 2)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-bold text-primary-foreground">
          {user?.name}
          <span className="ml-4">{user?.online ? <Badge variant='secondary'>Online</Badge>: <Badge variant='destructive'>Offline</Badge>}</span>
        </span>
        <br />
      </div>
    </Link>
  );
};
