import React from "react";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col text-xs justify-center text-center gap-1">
        <div className="flex flex-row gap-2 ">
          <a href="#" className="">
            Support
          </a>
          <span>|</span>
          <a href="#" className="">
            FAQ
          </a>
          <span>|</span>
          <a href="#" className="">
            Contact
          </a>
        </div>
        <a href="https://github.com/JasonPaff/Petsy" className=" text-lg flex justify-center">
          <BsGithub />
        </a>
        <p className="footer-year">2022</p>
      </div>
    </>
  );
}
