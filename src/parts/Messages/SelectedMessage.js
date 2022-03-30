import React, {useState} from "react";
import addMessageToThread from "../../services/messages/addMessageToThread";
import addNotification from "../../services/notifications/addNotification";

export default function SelectedMessage(props) {
    const [messageText, setMessageText] = useState(' ');

    const submitMessage = async () => {
        await addMessageToThread({
            message: messageText,
            threadId: props.selectedMessage.id
        });

        await addNotification({
            toUserId: props.selectedMessage.receiverUserId,
            fromUserId: props.selectedMessage.senderUserId,
            message: `new message from ${props.selectedMessage.sender}`,
            link: "profile/messages"
        });
    }

    return (
        <>
            {props.selectedMessage.messages && (<div className="flex flex-row">
                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="shadow-sm mr-2 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <button
                        type="submit"
                        onClick={() => {
                            setMessageText(' ');
                            submitMessage().catch((err) => console.log(err))
                        }}
                        className="cursor-pointer"
                    >
                        Send
                    </button>
                </div>
            )}
            <div className="flex flex-col ml-4 mt-4 h-1/2 max-w-60 break-words overflow-y-scroll">
                {props.selectedMessage.messages && props.selectedMessage.messages.map((message) =>
                    <span className="mr-4"
                          key={message.sentAt}>{message.sender} ({message.time}) - {message.message}
                    </span>
                )}
            </div>
        </>
    );
}