import { API_URL } from "@/lib/constants";
import { useQuery } from "react-query";
import { UserMessage } from "../UserMessage/UserMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

export const Messages = ({ id }: { id: string }) => {
  const { data: messages } = useQuery(`chat-messages-${id}`, async () => {
    return (
      await fetch(API_URL + `chat/get_messages/${id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("auth_token"),
        },
      })
    ).json();
  });
  useEffect(() => {
    const scrollHeight =
      document.querySelector("#scroll-area > div")?.scrollHeight;
    document
      .querySelector("#scroll-area > div")
      ?.scrollTo({ top: scrollHeight, behavior: "smooth" });
  }, [messages]);
  return (
    <ScrollArea className="w-full h-full" id="scroll-area">
      <div className="px-8 flex flex-col gap-2">
        {messages?.map((message: any) => (
          <UserMessage message={message} key={message._id} from={id} />
        ))}
      </div>
    </ScrollArea>
  );
};
