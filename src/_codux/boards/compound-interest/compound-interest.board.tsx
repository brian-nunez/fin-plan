import React from "react";
import { createBoard } from "@wixc3/react-board";
import { CompoundCalculator } from "../../../components/calculators/compound-interest";

export default createBoard({
  name: "CompoundInterest",
  Board: () => <CompoundCalculator />,
  environmentProps: {
    windowWidth: 932,
    canvasWidth: 445,
    canvasHeight: 596,
    windowHeight: 866,
  },
});
