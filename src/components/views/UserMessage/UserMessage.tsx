import { dateToFromNowDaily } from "@/lib/date-helpers";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export const UserMessage = ({ message, from }: any) => {
  const isNotMe = message?.sender == from;

  return (
    <div className={`flex ${isNotMe ? "justify-start" : "justify-end"}`}>
      <div
        className={`flex flex-col w-fit ${
          isNotMe ? "items-start" : "items-end"
        }`}
      >
        <div className={`w-fit `}>
          <div
            className={`bg-primary text-primary-foreground px-5 py-2 rounded-lg`}
          >
            {message.message}
          </div>
        </div>
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          {dateToFromNowDaily(message?.date)}
          {!isNotMe && message.read && <CheckCircledIcon />}
        </span>
      </div>
    </div>
  );
};
