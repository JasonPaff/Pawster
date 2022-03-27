import {useEffect, useState} from "react";
import {useSubscription} from '@apollo/react-hooks';
import getMessageThreads from "../../services/messages/getMessageThreads";
import {messageAddedToThreadSubscription} from "../../services/messages/messageAddedToThreadSubscription";

const sub = messageAddedToThreadSubscription;

export default function MessageList(props) {
    const [messages, setMessages] = useState([]);

    useSubscription(sub, {
        onSubscriptionData: (res) => {
            getMessages().catch(console.log);
        }
    });

    useEffect(() => {
        getMessages().catch(console.log);
    }, []);

    const getMessages = async () => {
        const messageThreads = getMessageThreads();

        messageThreads.sort((a, b) => {
            if (a.sentAt < b.sentAt) return 1;
            else if (a.sentAt > b.sentAt) return -1;
            return 0;
        });

        console.log(messageThreads);
        setMessages(messageThreads);
    }

    return (
        <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {/*{messages.map((message) => (*/}
                    {/*    <tr key={message.sentAt}*/}
                    {/*        onClick={() => console.log('click')}*/}
                    {/*    >*/}
                    {/*        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium*/}
                    {/*                        text-gray-900 sm:pl-6">*/}
                    {/*            <div className="flex flex-col">*/}
                    {/*                <span>subject</span>*/}
                    {/*                <span className="text-gray-500">sender</span>*/}
                    {/*            </div>*/}
                    {/*        </td>*/}
                    {/*        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">*/}
                    {/*            sent at*/}
                    {/*        </td>*/}
                    {/*    </tr>*/}
                    {/*))}*/}
                    </tbody>
                </table>
            </div>
        </div>
    );
}