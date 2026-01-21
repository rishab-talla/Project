import React from "react";
import Button from "./Button";

const ButtonList = () => {
  return (
    <div className="flex gap-8 text-black pl-5">
      <Button name="All" />
      <Button name="Live" />
      <Button name="Music" />
      <Button name="Podcast" />
      <Button name="Cricket" />
      <Button name="Gaming" />
    </div>
  );
};

export default ButtonList;
