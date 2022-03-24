import React from "react";

export default function Account() {
  const user = localStorage.getItem("user") || "Anonymous";

  return <div>{user}</div>;
}
