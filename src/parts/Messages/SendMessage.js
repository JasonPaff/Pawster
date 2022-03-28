import React from "react";

export default function SendMessage(props) {

    return (
        <div className="flex flex-col pt-4 pb-8 justify-center">
            <span className="ml-1">New Message</span>
            <input
                type="text"
                placeholder="Subject"
                onChange={(e) => console.log('click')}
                className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full
                        sm:text-sm border-gray-300 rounded-md caret-sky-500"
            />
            <textarea
                rows={5}
                placeholder="Message"
                onChange={(e) => console.log('click')}
                className="shadow-sm mb-1 focus:ring-sky-500 focus:border-sky-500 block w-full
                        sm:text-sm border border-gray-300 rounded-md mt-1 caret-sky-500"
            />
            <div className="flex flex-row">
                <select
                    onChange={(e) => console.log('click')}
                    className="block w-full text-base border-gray-300 focus:outline-none
                        focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
                >
                    {props.role === 'customer' && (
                        <>
                            <option>admin@fake.com</option>
                            <option>developer@fake.com</option>
                        </>)}
                    {props.role === 'staff' && (
                        <>
                            <option>admin@fake.com</option>
                            <option>support@fake.com</option>
                        </>)}
                    {props.role === 'admin' && (
                        <>
                            <option>developer@fake.com</option>
                            <option>support@fake.com</option>
                        </>)}

                </select>
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
        </div>
    );
}