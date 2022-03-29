import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiBell } from "react-icons/bi";

export default function NotificationDropdown(props) {
  return (
    <Popover className="relative">
      <Popover.Button
        className="p-1 rounded-full text-slate-400  hover:text-accent-red hover:bg-transparent
                    hover:border-accent-red focus:outline-none border-transparent"
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
        <Popover.Panel className="absolute z-10 w-40">
          <div className="flex flex-col bg-gray-200">
            {props.notifications.map((notification, i) => (
              <div key={"notification" + i} className="flex flex-row w-full">
                {notification.link === "none" && <div key={notification.id}>{notification.message}</div>}
                {notification.link !== "none" && (
                  <a key={notification.id} href={notification.link}>
                    <div>{notification.message}</div>
                  </a>
                )}
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
