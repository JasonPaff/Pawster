import {Popover, Transition} from '@headlessui/react'
import {Fragment} from "react";
import {BiBell} from "react-icons/bi";
import classNameJoiner from "../../utils/classNameJoiner";
import removeNotification from "../../services/notifications/removeNotification";
import {NavLink} from "react-router-dom";

export default function NotificationDropdown(props) {
    async function clearNotification(id) {
        await removeNotification(id);
        props.setReloadNotifications(true);
    }

    return (
        <Popover
            onClick={() => props.setNewNotifications(false)}
            className="relative flex flex-grow">
            <Popover.Button
                className={classNameJoiner(
                    "p-1 rounded-full text-slate-400 focus:outline-none border-transparent",
                    "hover:text-accent-red hover:bg-transparent hover:border-accent-red",
                    props.newNotifications ? "outline-none text-red-400 border-red-400" : "",
                )}>
                <BiBell
                    className="h-5 w-5"
                    aria-hidden="true"/>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute z-10 px-4 flex flex-col mt-8 py-4 rounded bg-background-light
                shadow border border-slate-300 w-52 focus:outline-none">
                    <div className="flex flex-col">
                        {props.notifications.map((notification, index) => (
                                <div className="flex flex-row w-full"
                                     key={index}>
                                    {notification.link === "none" && (
                                        <div>
                                            {notification.message}
                                        </div>
                                    )}
                                    {notification.link !== "none" && (
                                        <NavLink to={notification.link}
                                                 onClick={() => clearNotification(notification.id)}
                                        >
                                            <div className={classNameJoiner(index < props.notifications.length - 1 ? "border-b-2" : "")}>
                                                {notification.message}
                                            </div>
                                        </NavLink>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}