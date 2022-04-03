import React from "react";

export default function BaseRateCard(props) {
    return (
      <>
          <div className="flex-col mb-3">
              <div className="flex justify-between">
                  <div>{props.title}</div>
                  <div>{props.baseRate}</div>
              </div>
              <div className="flex justify-between text-sm">
                  <div>{props.tagLineOne}</div>
                  <div>{props.tagLineTwo}</div>
              </div>
          </div>
      </>
    );
}