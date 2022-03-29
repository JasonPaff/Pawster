import getUserById from "../services/user/getUserById";
import getMessageThreads from "../services/messages/getMessageThreads";

export const attachNames = async (messages) => {
    for (let c = 0; c < messages.length; c++) {
        const senderData = await getUserById(messages[c].senderUserId);
        const sender = senderData.data.getUserById.user;
        messages[c].sender = `${sender.firstName} ${sender.lastName}`;

        const receiverData = await getUserById(messages[c].receiverUserId);
        const receiver = receiverData.data.getUserById.user;
        messages[c].receiver = `${receiver.firstName} ${receiver.lastName}`;
    }
};

export const adjustTimes = async (messages) => {
    for (let c = 0; c < messages.length; c++) {
        for (let d = 0; d < messages[c].messages.length; d++) {
            messages[c].messages[d].time =
                new Date(messages[c].messages[d].sentAt).toLocaleString();
        }
        const lastItem = messages[c].messages.length - 1;
        messages[c].time =
            new Date(messages[c].messages[lastItem].sentAt).toLocaleString();
    }
};

export const loadMessages = async (selectedMessage, setSelectedMessage, setMessages) => {
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