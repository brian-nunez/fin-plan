import React from "react";
import { createBoard } from "@wixc3/react-board";
import { InterestCalculator } from "../../../components/interest-calculator/interest-calculator";

export default createBoard({
  name: "Calculators",
  Board: () => <InterestCalculator />,
  environmentProps: {
    windowWidth: 800,
    canvasWidth: 473,
    canvasHeight: 596,
  },
});
