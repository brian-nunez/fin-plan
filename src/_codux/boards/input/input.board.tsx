import React from "react";
import { createBoard } from "@wixc3/react-board";
import { Input } from "../../../components/input/input";

export default createBoard({
  name: "Input",
  Board: () => <Input label="My Label" />,
});
