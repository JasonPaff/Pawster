import React from "react";

export default function BaseRateCard(props) {
  return (
    <div className="border-b">
      <div className="flex justify-between gap-3">
        <div>{props.title}</div>
        <div>${props.baseRate}</div>
      </div>
      <div className="flex justify-between text-xs">
        <div>{props.tagLineOne}</div>
        <div className="text-xs">{props.tagLineTwo}</div>
      </div>
    </div>
  );
}
