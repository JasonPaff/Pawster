import React, {useEffect, useState} from "react";
import {useSubscription} from "@apollo/react-hooks";
import MessageList from "../parts/Messages/MessageList";
import SelectedMessage from "../parts/Messages/SelectedMessage";
import {adjustTimes, attachNames} from "../utils/message_utils";
import getMessageThreads from "../services/messages/getMessageThreads";
import {messageAddedToThreadSubscription} from "../services/messages/messageAddedToThreadSubscription";
import {messageThreadCreatedSubscription} from "../services/messages/messageThreadCreatedSubscription";

export default function Messages() {
    document.title = "Messages";

    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState([]);
    const [reloadMessages, setReloadMessages] = useState(true);
    const userId = localStorage.getItem('id');

    useSubscription(messageAddedToThreadSubscription, {
        onSubscriptionData: (res) => {
            const messageData = res.subscriptionData.data.messageAdded.messageThread;
            if (messageData.senderUserId === userId || messageData.receiverUserId === userId) {
                setReloadMessages(true);
            }
        }
    });

    useSubscription(messageThreadCreatedSubscription, {
        onSubscriptionData: (res) => {
            const messageData = res.subscriptionData.data.messageThreadCreated.messageThread;
            if (messageData.senderUserId === userId || messageData.receiverUserId === userId) {
                setReloadMessages(true);
            }
        }
    });

    useEffect(() => {
        loadMessages().catch((err) => console.log(err));
        setReloadMessages(false);
    }, [reloadMessages]);

    const loadMessages = async () => {
        const messageThreadsData = await getMessageThreads();
        const messageThreads = messageThreadsData.data.getMessageThreads.messageThreads;

        await attachNames(messageThreads);
        await adjustTimes(messageThreads);
        await setMessages(messageThreads);

        // reload currently selected message
        for (let c = 0; c < messageThreads.length; c++) {
            if (messageThreads[c].id === selectedMessage.id) {
               await setSelectedMessage(messageThreads[c]);
               break;
            }
        }
    };

    return (
        <div className="flex flex-col px-4 sm:grid sm:grid-cols-2 sm:grid-rows-2 items-start">
            <div className="row-span-2 ml-2">
                <MessageList messages={messages} setSelectedMessage={setSelectedMessage}/>
            </div>
            <div className="flex flex-col">
                <SelectedMessage selectedMessage={selectedMessage}/>
            </div>
        </div>
    );
}