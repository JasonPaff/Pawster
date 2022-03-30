import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

export default function Account() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const fullName = firstName + " " + lastName;
  const user = fullName || "Anonymous";

  const menuItem = "hover:bg-white border-y border-transparent hover:border-slate-200 hover:shadow-sm transition-all ease-in-out duration-300 px-6 py-1 focus:outline-none";

  return (
    <div className="flex flex-row">
      <Menu as="div" className="relative flex flex-row gap-2 focus:outline-none z-10">
        <Menu.Button className="border-0 p-0 hover:bg-inherit hover:text-accent-red focus:outline-none ">{user}</Menu.Button>
        <Menu.Items className="flex flex-col absolute mt-8 py-4 rounded bg-background-light shadow border border-slate-300 focus:outline-none">
          <Menu.Item className={menuItem}>
            <NavLink to="/profile" className="link">
              Profile
            </NavLink>
          </Menu.Item>
          <Menu.Item className={menuItem}>
            <NavLink to="/profile/messages" className="link">
              Messages
            </NavLink>
          </Menu.Item>
          <Menu.Item className={menuItem}>
            <NavLink to="/logout" className="link">
              Logout
            </NavLink>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}
