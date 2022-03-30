import React, {useEffect, useRef, useState} from "react";
import createMessageThread from "../../services/messages/createMessageThread";
import addNotification from "../../services/notifications/addNotification";
import getUserById from "../../services/user/getUserById";

export default function SendMessage(props) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const subjectRef = useRef();
    const messageRef = useRef();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const user = await getUserById(localStorage.getItem('id'));
        const userName = `${user.data.getUserById.user.firstName} ${user.data.getUserById.user.lastName}`
        await createMessageThread({
            message: message,
            receiverUserId: props.hostId,
            senderUserId: localStorage.getItem('id'),
            subject: subject
        });
        await addNotification({
            toUserId: props.hostId,
            fromUserId: localStorage.getItem('id'),
            message: `new message from ${userName}`,
            link: "profile/messages"
        });
        setSubject('');
        setMessage('');
        messageRef.current.value = '';
        subjectRef.current.value = '';
        alert('message sent');
    }

    return (
        <div className="flex flex-col pt-4 pb-8 justify-center">
            <form onSubmit={(e) => handleSendMessage(e)}>
                <input
                    required
                    type="text"
                    placeholder="Subject"
                    ref={subjectRef}
                    onChange={(e) => setSubject(e.target.value)}
                    className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full
                        sm:text-sm border-gray-300 rounded-md caret-sky-500"
                />
                <textarea
                    required
                    rows={5}
                    placeholder="Message"
                    ref={messageRef}
                    onChange={(e) => setMessage(e.target.value)}
                    className="shadow-sm mb-1 focus:ring-sky-500 focus:border-sky-500 block w-full
                        sm:text-sm border border-gray-300 rounded-md mt-1 caret-sky-500"
                />
                <div className="flex flex-row">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent
                        shadow-sm text-sm font-medium rounded-md text-white bg-sky-500
                        hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-sky-500 w-24 md:w-48"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}