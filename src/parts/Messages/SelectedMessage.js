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
            userId: props.selectedMessage.receiverUserId,
            message: "you have a new message",
            link: "profile/messages"
        });
    }

    return (
        <>
            <div className="flex flex-row">
                <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full
                                sm:text-sm border-gray-300 rounded-md caret-sky-500"
                />
                <button
                    type="submit"
                    onClick={() => {setMessageText(' '); submitMessage().catch((err) => console.log(err))}}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent
                                shadow-sm text-sm font-medium rounded-md text-white bg-sky-500
                                hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                                focus:ring-sky-500 w-24 md:w-48"
                >
                    Send
                </button>
            </div>
            <div className="flex flex-col ml-4 mt-4">
                {props.selectedMessage.messages && props.selectedMessage.messages.map((message) =>
                    <span className="mr-4"
                          key={message.sentAt}>{message.sender} ({message.time}) - {message.message}
                    </span>
                )}
            </div>
        </>
    );
}