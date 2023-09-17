import { useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { API_URL } from "../constants";
import { queryClient } from "@/components/views/Provider/Provider";

export const useSocketHandler = () => {
  useEffect(() => {
    const socket = io(API_URL, {
      auth: {
        token: localStorage.getItem("auth_token"),
      },
    });
    socket.connect();

    socket.on("online-change", updateUsersOnlineStatus);
    socket.on("read-message-query", updateReadMessageStatus);

    socket.on("chat-message", (message) =>
      updateMessagesOnChatMessage(message, socket)
    );
  }, []);
};

const updateUsersOnlineStatus = (changeUser: any) => {
  const previousValue = queryClient.getQueryData(["users"]) ?? [];
  const singleUser = queryClient.getQueryData<object>([
    `user-${changeUser._id}`,
  ]);
  const updatedUsers = previousValue?.users?.map((user) => {
    if (user._id == changeUser._id) {
      return {
        ...user,
        online: changeUser.online,
      };
    }
    return user;
  });
  queryClient.setQueryData(["users"], { users: updatedUsers });
  if (singleUser)
    queryClient.setQueryData([`user-${changeUser._id}`], {
      ...singleUser,
      online: changeUser.online,
    });
};

const updateMessagesOnChatMessage = (
  message: any,
  socket: Socket<any, any>
) => {
  const senderMessages = queryClient.getQueryData<any[]>([
    `chat-messages-${message?.sender}`,
  ]);
  const receiverMessages = queryClient.getQueryData<any[]>([
    `chat-messages-${message?.receiver}`,
  ]);

  if (senderMessages) {
    queryClient.setQueryData(
      [`chat-messages-${message?.sender}`],
      [...senderMessages, message]
    );
    socket.emit("read-message-mutate", { message });
  } else if (receiverMessages) {
    queryClient.setQueryData(
      [`chat-messages-${message?.receiver}`],
      [...receiverMessages, message]
    );
  }
};

export const updateReadMessageStatus = (readMessage) => {
  const receiverMessages = queryClient
    .getQueryData<any[]>([`chat-messages-${readMessage?.receiver}`])
    ?.map((message) => {
      if (readMessage?._id === message._id) {
        return { ...readMessage };
      }
      return message;
    });
  queryClient.setQueryData(
    [`chat-messages-${readMessage?.receiver}`],
    [...receiverMessages]
  );
};
