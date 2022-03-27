import React from "react";

export default function SelectedMessage(props) {

    return (
        <div className="mt-10 mr-8">
            <div className="flex flex-row">
                <input
                    type="text"
                    placeholder="enter message"
                    onChange={(e) => console.log('click')}
                    className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full
                                sm:text-sm border-gray-300 rounded-md caret-sky-500"
                />
                <button
                    type="submit"
                    onClick={() => console.log('click')}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent
                                shadow-sm text-sm font-medium rounded-md text-white bg-sky-500
                                hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                                focus:ring-sky-500 w-24 md:w-48"
                >
                    Send
                </button>
            </div>
            <div className="flex flex-col ml-4 mt-4">

            </div>
        </div>
    );
}