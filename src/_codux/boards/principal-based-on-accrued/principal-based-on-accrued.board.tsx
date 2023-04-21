import React from "react";
import { createBoard } from "@wixc3/react-board";
import { PrincipalBasedOnAccrued } from "../../../components/calculators/principal-based-on-accrued";

export default createBoard({
  name: "PrincipalBasedOnAccrued",
  Board: () => <PrincipalBasedOnAccrued />,
  environmentProps: {
    canvasWidth: 469,
    windowWidth: 932,
    windowHeight: 866,
  },
});
