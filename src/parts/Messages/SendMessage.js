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
                    className="shadow-sm block w-full sm:text-sm rounded-md"
                />
                <textarea
                    required
                    rows={5}
                    placeholder="Message"
                    ref={messageRef}
                    onChange={(e) => setMessage(e.target.value)}
                    className="shadow-sm mb-1 block w-full
                        sm:text-sm border rounded-md mt-1"
                />
                <div className="flex flex-row">
                    <button
                        type="submit"
                        className="cursor-pointer"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}