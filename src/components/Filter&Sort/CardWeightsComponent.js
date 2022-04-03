import React from "react";
import { data } from "./data";
import { RadioGroup } from "@headlessui/react";

function CardWeightsComponent(props) {
  return (
    <>
      <RadioGroup key={"cardWeightsOptions"} value={props.selectedWeight} onChange={props.setSelectedWeight} className="flex gap-2 flex-wrap justify-around ">
        {data.weights.map((opt, i) => {
          return (
            <RadioGroup.Option
              key={opt.id}
              value={opt}
              name={opt.name}
              className={({ active, checked }) =>
                `flex rounded bg-white justify-center items-center cursor-pointer focus:outline-none border hover:border-red-400 hover:shadow
                ${active ? "ring-2 ring-offset-1 ring-offset-accent-red ring-white ring-opacity-60 " : ""}
                ${checked ? "border-accent-red " : "border-slate-300 "}
                `
              }
            >
              {({ checked }) => {
                return (
                  <div className="flex flex-col text-sm w-28 items-center p-2 border rounded">
                    <div className={checked ? "text-accent-red" : "text-slate-600"}>{opt.title}</div>
                    <div className={checked ? "text-accent-red" : "text-slate-600"}>{opt.weight} Lbs</div>
                  </div>
                );
              }}
            </RadioGroup.Option>
          );
        })}
      </RadioGroup>
    </>
  );
}

export default CardWeightsComponent;
