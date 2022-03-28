import getUserById from "../services/user/getUserById";

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