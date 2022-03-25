import React from "react";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center h-16 bg bg-background-darker">
      <div className="footer-grid-box">
        <div className="flex flex-row gap-2 ">
          <a href="#" className="">
            Support
          </a>
          <span>|</span>
          <a href="#" className="">
            FAQ
          </a>
        </div>
        <a href="" className="icon">
          <BsGithub />
        </a>
        <a href="#" className="">
          Contact
        </a>
      </div>
    </footer>
  );
}
