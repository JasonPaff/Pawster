import React, { useState } from "react";
import addMessageToThread from "../../services/messages/addMessageToThread";
import addNotification from "../../services/notifications/addNotification";
import classNameJoiner from "../../utils/classNameJoiner";

export default function SelectedMessage(props) {
  const [messageText, setMessageText] = useState(" ");
  const myId = localStorage.getItem("id");

  const submitMessage = async () => {
    await addMessageToThread({
      message: messageText,
      threadId: props.selectedMessage.id,
    });

    const userId = localStorage.getItem("id");
    const receiver = userId === props.selectedMessage.receiverUserId ? props.selectedMessage.senderUserId : props.selectedMessage.receiverUserId;
    await addNotification({
      toUserId: receiver,
      fromUserId: userId,
      message: `new message from ${props.selectedMessage.sender}`,
      link: "/profile/messages",
    });
  };

  const textBubble = "border border-slate-300 p-3 rounded-t-xl w-11/12";
  const myTextBubble = "bg-green-50 rounded-bl-xl self-end";
  const toMeTextBubble = "bg-blue-50 rounded-br-xl";
  console.log(props);

  return (
    <>
      <div className="pl-2">
        <div className="">
          <span className="text-sm text-gray-600 w-"> Message to: </span>
          <span className="text-lg font-medium"> {myId === props.selectedMessage.senderUserId ? props.selectedMessage.receiver : props.selectedMessage.sender}</span>
        </div>
        <div className="">
          <span className="text-sm text-gray-600">Subject: </span>
          <span className="text-lg font-medium">{props.selectedMessage.subject}</span>
        </div>
      </div>
      {props.selectedMessage.messages && (
        <div className="flex flex-row gap-1 mt-2 mb-6">
          <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)} className=" bg-white border-slate-500" />
          <button
            type="submit"
            onClick={() => {
              setMessageText(" ");
              submitMessage().catch((err) => console.log(err));
            }}
            className="py-1  bg-accent-green text-white"
          >
            Send
          </button>
        </div>
      )}
      {/* <div className="flex flex-col ml-4 mt-4 h-2/3 max-w-60 break-words overflow-y-scroll"> */}
      <div className="flex flex-col gap-2">
        {props.selectedMessage.messages &&
          props.selectedMessage.messages.map((message) => (
            <div className={classNameJoiner(textBubble, message.userId === myId ? myTextBubble : toMeTextBubble)} key={message.sentAt}>
              <div className=" italic text-gray-500">
                {(message.userId === myId && "me :") || (message.userId === props.selectedMessage.receiverUserId ? props.selectedMessage.receiver + ":" : props.selectedMessage.sender + ":")}
              </div>

              <div className="">{message.message}</div>
              <div className="text-xs text-right">{message.time} </div>
            </div>
          ))}
      </div>
    </>
  );
}