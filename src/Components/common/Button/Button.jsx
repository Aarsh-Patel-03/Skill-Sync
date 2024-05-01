import React from "react";
import "./Button.scss";

export default function Button({ title, onClick }) {
  return (
    <button className="common-btn" onClick={onClick}>
      {title}
    </button>
  );
}
