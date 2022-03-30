export default function MessageList(props) {
    return (
        <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {props.messages.map((message) => (
                        <tr key={message.id}
                            onClick={() => props.setSelectedMessage(message)}
                        >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium
                                            text-gray-900 sm:pl-6 cursor-pointer">
                                <div className="flex flex-col">
                                    <span>{message.subject} <br/>{message.time}</span>
                                    <span className="text-gray-500">From: {message.sender}</span>
                                    <span className="text-gray-500">To: {message.receiver}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}