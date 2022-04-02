import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiBell } from "react-icons/bi";
import classNameJoiner from "../../utils/classNameJoiner";
import removeNotification from "../../services/notifications/removeNotification";
import {Link, useNavigate} from "react-router-dom";

export default function NotificationDropdown(props) {
  const navigate = useNavigate();

  async function clearNotification(link, id) {
    await removeNotification(id);
    props.setReloadNotifications(true);
    console.log(window.location.href);
    if (window.location.href === "http://localhost:3000/profile/#") {
        if (link === "profile/messages") link = "/messages";
    } else if (window.location.href === "http://localhost:3000/profile/messages#") {
        return;
    }

    navigate(link);
  }

  return (
    <Popover onClick={() => props.setNewNotifications(false)} className="relative flex flex-grow">
      <Popover.Button
        className={classNameJoiner(
          "p-1 rounded-full text-slate-400 focus:outline-none border-transparent",
          "hover:text-accent-red hover:bg-transparent hover:border-accent-red",
          props.newNotifications ? "outline-none text-red-400 border-red-400" : ""
        )}
      >
        <BiBell className="h-5 w-5" aria-hidden="true" />
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
        <Popover.Panel
          className="absolute z-10 right-0 flex flex-col mt-8 py-4 rounded bg-background-light
                shadow border border-slate-300  "
        >
          <div className="flex flex-col px-4 ">
            {/* border-y border-transparent hover:bg-white cursor-pointer hover:border-slate-200 hover:shadow-sm */}
            {props.notifications.map((notification, index) => (
              <div className="flex flex-row whitespace-nowrap " key={index}>
                {notification.link === "none" && <div>{notification.message}</div>}
                {notification.link !== "none" && (
                  <Link to={notification.link} onClick={() => clearNotification(notification.link, notification.id)}>
                    <div className={classNameJoiner(index < props.notifications.length - 1 ? "border-b-2" : "")}>{notification.message}</div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}