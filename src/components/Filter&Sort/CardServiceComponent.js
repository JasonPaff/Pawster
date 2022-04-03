import { data } from "./data";
import { RadioGroup } from "@headlessui/react";

import React from "react";

function CardServiceComponent(props) {
  return (
    <RadioGroup key={"cardServiceOptions"} value={props.selectedService} onChange={props.setSelectedService} className="flex gap-2 px-6 pt-6 pb-4 flex-wrap justify-around  ">
      {data.services.map((opt, i) => {
        return (
          <RadioGroup.Option
            key={opt.id}
            value={opt}
            name={opt.name}
            className={({ active, checked }) =>
              `flex rounded bg-white w-36 h-24 justify-center items-center cursor-pointer focus:outline-none border hover:border-red-400 hover:shadow
                ${active ? "ring-2 ring-offset-1 ring-offset-accent-red ring-white ring-opacity-60 " : ""}
                  ${checked ? "border-accent-red " : "border-slate-300 "}
                     `
            }
          >
            {({ checked }) => {
              return (
                <span className={checked ? "text-accent-red" : "text-slate-600"}>
                  <img src={checked ? require("../../img/icons/" + opt.iconColor) : require("../../img/icons/" + opt.iconContour)} alt={opt.name} className=" h-10 mx-auto mb-2" />
                  {opt.label}
                </span>
              );
            }}
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
}

export default CardServiceComponent;
