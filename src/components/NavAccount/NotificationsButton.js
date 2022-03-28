import {BellIcon} from "@heroicons/react/outline";

export default function NotificationButton() {
    return (
        <button
            type="button"
            className="p-1 rounded-full text-gray-400 hover:text-gray-500
                    focus:outline-none"
        >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-4 w-4" aria-hidden="true"/>
        </button>
    );
}