import React, {useState} from "react";

export default function SendMessage(props) {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleSendMessage = async () => {

    }

    return (
        <div className="flex flex-col pt-4 pb-8 justify-center">
            <input
                type="text"
                placeholder="Subject"
                onChange={(e) => setSubject(e.target.value)}
                className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full
                        sm:text-sm border-gray-300 rounded-md caret-sky-500"
            />
            <textarea
                rows={5}
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
                className="shadow-sm mb-1 focus:ring-sky-500 focus:border-sky-500 block w-full
                        sm:text-sm border border-gray-300 rounded-md mt-1 caret-sky-500"
            />
            <div className="flex flex-row">
                <button
                    type="submit"
                    onClick={() => handleSendMessage()}
                    className="inline-flex justify-center py-2 px-4 border border-transparent
                        shadow-sm text-sm font-medium rounded-md text-white bg-sky-500
                        hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-sky-500 w-24 md:w-48"
                >
                    Send
                </button>
            </div>
        </div>
    );
}