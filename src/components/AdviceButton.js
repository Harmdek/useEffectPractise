import React from "react";

export default function AdviceButton(props) {
  return (
    <button className="button" onClick={props.onClick}>
      <span>{props.icon}</span>
      {props.buttonText}
    </button>
  );
}
