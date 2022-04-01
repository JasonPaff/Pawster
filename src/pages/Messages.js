import React, { useEffect, useState } from "react";
import { loadMessages } from "../utils/message_utils";
import { useSubscription } from "@apollo/react-hooks";
import MessageList from "../parts/Messages/MessageList";
import SelectedMessage from "../parts/Messages/SelectedMessage";
import { messageAddedToThreadSubscription } from "../services/messages/messageAddedToThreadSubscription";

export default function Messages() {
  document.title = "Messages";

  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState([]);
  const [reloadMessages, setReloadMessages] = useState(true);
  const userId = localStorage.getItem("id");

  useSubscription(messageAddedToThreadSubscription, {
    onSubscriptionData: (res) => {
      const messageData = res.subscriptionData.data.messageAdded.messageThread;
      if (messageData.senderUserId === userId || messageData.receiverUserId === userId) {
        setReloadMessages(true);
      }
    },
  });

  useEffect(() => {
    loadMessages(selectedMessage, setSelectedMessage, setMessages).catch((err) => console.log(err));
    setReloadMessages(false);
  }, [reloadMessages]);

  return (
    <>
      {/* <h2 className="text-center ">Your Messages</h2> */}
      <div className=" flex flex-row  gap-3 xl:px-8 xl:pt-6 xl:gap-6">
        <div className="w-1/3 shrink-0 max-h-[calc(100vh_-_260px)] overflow-auto">
          <MessageList messages={messages} setSelectedMessage={setSelectedMessage} />
        </div>
        <div className="grow max-h-[calc(100vh_-_260px)] overflow-auto p-4 border rounded border-slate-300 bg-background-light">
          <SelectedMessage selectedMessage={selectedMessage} />
        </div>
      </div>
    </>
  );
}
