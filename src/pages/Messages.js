import React from "react";
import SendMessage from "../parts/Messages/SendMessage";
import SelectedMessage from "../parts/Messages/SelectedMessage";
import MessageList from "../parts/Messages/MessageList";

export default function Messages() {
    document.title = "Messages"

    return (
        <>
            <div className="flex flex-col px-4 sm:grid sm:grid-cols-2 sm:grid-rows-2 items-start">
                <div className="">
                    <SendMessage/>
                </div>
                <div className="row-span-2 ml-2">
                    <SelectedMessage/>
                </div>
                <div className="flex flex-col">
                    <MessageList/>
                </div>
            </div>
        </>
    );
}